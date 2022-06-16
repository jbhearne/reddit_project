export const fakePosts = {
    test: true,
    children: [
        {
            data: {
                author: 'becky',
                title: 'becky`s post',
                created: 0,
                score: 100,
                selfText: 'Becky`s text',
                url: 'www.becky.becky',
                id: '123'
            }
        },
        {
            data: {
                author: '',
                title: '',
                created: 0,
                score: '',
                selfText: '',
                url: '',
                id: ''
            }
        },
        {
            data: {
                author: '',
                title: '',
                created: 0,
                score: '',
                selfText: '',
                url: '',
                id: '',
                gallery_data: {
                    items: [
                        {
                            media_id: 'media_id'
                        }
                    ]
                },
                media_metadata: {
                    'media_id': {
                        e: '',
                        p: [
                            {
                                u: ''
                            }
                        ]
                    }
                },
                post_hint: '',
                media: {
                    oembed: {
                        html: ''
                    },
                    reddit_video: {
                        fallback_url: ''
                    }
                }
            }
        }
        
    ]
}

/*{
    data: {
        author: '',
        title: '',
        created: 0,
        score: '',
        selfText: '',
        url: '',
        id: '',
        gallery_data: {
            items: [
                {
                    media_id: ''
                }
            ]
        },
        media_metadata: {
            'media id': {
                e: ''
                p: [
                    {
                        u: ''
                    }
                ]
            }
        },
        post_hint: '',
        media: {
            oembed: {
                html: ''
            },
            reddit_video: {
                fallback_url: ''
            }
        }
    }
}*/