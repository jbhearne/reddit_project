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

export const fakeSubreddits = {
    test: true,
    children: [
        {
            data: {
                display_name: 'testSub',
                icon_img: 'testIcon.test',
                url: 'www.testSub.sub',
                description: 'describe testSub',
                id: '123'
            }
        },
        {
            data: {
                display_name: 'noIconSub',
                url: 'www.noIconSub.sub',
                description: 'describe noIconSub',
                id: '1234'
            }
        },
        {
            data: {
                display_name: 'noDescription',
                icon_img: 'noDescription.test',
                url: 'www.noDescription.sub',
                id: '12345'
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