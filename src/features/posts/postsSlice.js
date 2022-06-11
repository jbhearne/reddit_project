import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchReddit } from '../../app/redditAPI';
import { convertUnixTime } from '../../app/convertUnixTime';

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (url) => {
        const response = await fetchReddit(url);
        console.log(response.children[0].data.gallery_data)
        //const res = response
        //console.log(res)

        const mapp = response.children.map(child => {
            console.log(child)
            
            const getImageUrls = () => {
                let imageUrls = []
                
                if (child.data.gallery_data) {
                    const imageIdData = child.data.gallery_data.items.filter(idData => child.data.media_metadata[idData.media_id].e === 'Image')
                    imageUrls = imageIdData.map(image => {
                        return child.data.media_metadata[image.media_id].p[0].u.replace('https://preview.redd.it', 'https://i.redd.it');
                    })
                } else if (child.data.post_hint === 'image') {
                    imageUrls.push(child.data.url);
                };
                return imageUrls
            }

            const getMedia = () => {
                const media = {}
                if (child.data.media) {
                    if (child.data.media.oembed) {
                        media.embed = child.data.media.oembed.html.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
                    } else if (child.data.media.reddit_video) {
                        media.video = child.data.media.reddit_video.fallback_url
                    }
                }
                return media
            }

            return {
                author: child.data.author,
                title: child.data.title,
                date: convertUnixTime(child.data.created),
                upvotes: child.data.score,
                text: child.data.selftext,
                images:  getImageUrls(),
                media:  getMedia(),
                url: child.data.url,
                id: child.data.id
            }
        })
        //console.log(response)
        //console.log(res)
        console.log(mapp[0])
        return mapp
    }
)

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        prefix: 'https://www.reddit.com',
        path: '',
        url: '',
        posts: [],
        isLoading: false,
        hasError: false
    },
    reducers: {
        setPostsPath: (state, action) => {
            state.path = action.payload
        },
        setPostsUrl: (state, action) => {
            state.url = state.prefix + state.path;
        },
        setPostsPrefix: (state, action) => {
            state.prefix = action.payload;
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts = action.payload
            state.isLoading = false;
            state.hasError = false;
        },
        [fetchPosts.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        }
    }
})

export const selectPosts = (state) => state.posts.posts;
export const selectPostsUrl = (state) => state.posts.url;
export const selectPostsPath = (state) => state.posts.path;
export const selectPostsPrefix = (state) => state.posts.prefix;
export const setPostsUrl = postsSlice.actions.setPostsUrl;
export const setPostsPrefix = postsSlice.actions.setPostsPrefix;
export const setPostsPath = postsSlice.actions.setPostsPath;

export default postsSlice.reducer