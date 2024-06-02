export const adminmenu = [
    {
        name: 'menu.admin.home', link: '/home',
        menus: [
            {
                name: 'menu.admin.home', link: '/home',
            },
        ],
    },
    {
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            // {
            //     name: 'menu.admin.story-redux', link: '/system/story-redux'
            // },

            // {
            //     name: 'menu.admin.manage-story', link: '/system/manage-story'
            // },
        ]
    },
    // {
    //     name: 'menu.admin.record',
    //     menus: [
    //         {
    //             name: 'menu.admin.manage-record', link: '/system/record-manage'
    //         },
    //         {
    //             name: 'menu.admin.movie-redux', link: '/system/movie-redux'
    //         },
    //     ]
    // }
    {
        name: 'menu.admin.movie',
        menus: [
            {
                name: 'menu.admin.movie-redux', link: '/system/movie-redux'
            },
            {
                name: 'menu.admin.showtime-redux', link: '/system/showtime-redux'
            },
        ]
    },
    {
        name: 'menu.admin.booking-ticket',
        menus: [
            {
                name: 'menu.admin.booking-ticket-wait', link: '/system/booking-ticket-wait'
            },
            {
                name: 'menu.admin.booking-ticket-confirm', link: '/system/booking-ticket-confirm'
            },
            // {
            //     name: 'menu.admin.booking-ticket-cancel', link: '/system/booking-ticket-confirm'
            // },

        ]
    }
];

export const authormenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.story-redux', link: '/system/story-redux'
            },
            {
                name: 'menu.admin.manage-story', link: '/system/manage-story'
            },
        ]
    }
];


export const staffmenu = [
    {
        name: 'menu.admin.home', link: '/home',
        menus: [
            {
                name: 'menu.admin.home', link: '/home',
            },
        ],
    },
    {
        name: 'menu.admin.movie',
        menus: [
            {
                name: 'menu.admin.movie-redux', link: '/system/movie-redux'
            },
            {
                name: 'menu.admin.showtime-redux', link: '/system/showtime-redux'
            },
        ]
    },
    {
        name: 'menu.admin.booking-ticket',
        menus: [
            {
                name: 'menu.admin.booking-ticket-wait', link: '/system/booking-ticket-wait'
            }
        ]
    }
];

export const customermenu = [
    {
        name: 'menu.admin.home', link: '/home',
        menus: [
            {
                name: 'menu.admin.home', link: '/home',
            },
        ],

    },
    {
        name: 'menu.admin.booking',
        menus: [
            {
                name: 'menu.admin.booking', link: '/system/booking-detail',
            },
        ],
    },
];