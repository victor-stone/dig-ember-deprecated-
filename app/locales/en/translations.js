export default {
    queryOptions: {
            instrumental: 'instrumentals only',
            limit: 'results',
            recent: 'recent',
            licenses: {
                all: 'All licenses',
                free: 'Free for commercial use',
                ccplus: 'Royalty free license',
                },
        },
    navbar: {
        searchPlaceHolder: "genre, instrument, etc.",
        options: 'options',
        links: {
            free: 'free',
            ccplus: 'licensed',
            film: 'music for film',
            games: 'music for games',
            how: 'how it works',
            freetitle: 'Free for Commercial Use',
            ccplustitle: 'Royalty Free Licensed',
            filmtitle: 'Music for Film and Video', 
            gamestitle: 'Music for Video Games',
            howtitle: 'How this site works',
        },
    },
    dlPopup: {
        freeToUse: "Free to use in commercial projects.",
        forNonComm: "For non commercial projects only.",
        toUseThisMusic: "To use this music you are <u>required</u> to give credit to the musicians. Copy the text below to your project.",
        download:  "Download",
        buyALicense1: "Buy a License",
        buyALicense2: 'to remove these restrictions',
        plainText: 'Plain Text',
        HTML: 'HTML',
        downloadButtonText: "Download",
        licenseTextPlain: "\"{{songTitle}}\" by {{artistName}} (c) {{year}} Licensed under a Creative Commons {{licenseName}} license. {{filePageUrl}}",
        licenseTextHTML: "<div class=\"attribution-block\">\"<a href=\"{{filePageUrl}}\">{{songTitle}}</a>\" by {{artistName}} (c) {{year}} Licensed under a Creative Commons <a href=\" {{licenseUrl}}\">{{licenseName}}</a> license.</div>",
        copyToClip: 'Copy to clipboard',
        featuring: 'Ft: {{ft}} ',
        featuringHTML: '<div class=\"attribution-ft-block\"> Ft: {{ft}} </div>',
        close: 'Close'
    },
    tbPopup: {
        trackback: 'Trackback',
        title: '{{name}} by {{artist}}',
        featuring: 'Includes: {{name}} by {{artist}}',
        close: 'Close'
    },
    tbForm: {
       title: 'Submit a Trackback for {{upload.upload_name}}',
       yourName: 'Your Name',
       tellUs: 'let us know who you are',
       youEmail: 'Your email',
       weMayCon: 'We may contact you here',
       URL: 'URL',
       exURL: 'http://website/with/media',
       artist: 'Artist Name',
       medType: 'Media type',
       whoMade: 'Who made the video/podcast/etc?',
       types: {
            video: 'Video',
            podcast: 'Podcast',
            album: 'Album',
            website: 'Web site',
            },
       embed: 'Embed code',
       submit: 'submit',
       cancel: 'cancel',
       missingFields: 'You must fill in your email address and the link to the trackback.',
       success: 'Your trackback has been submitted. it will appear after it has been approved.',
       wups: "Wups. Something didn't work quite right.",
       
    },
    pagination: {
        prev: "← Previous",
        next: "Next →",
    },
    upload: {
        moreBy: "More by {{artist}}",
        moreLikeThis: 'More like this',
        trackbacks: 'Trackback Projects',
        remixes: 'Remixed at ccMixter',
        addTrackback: 'Add',
    },
    share: {
        share: 'Share',
        fb: "Share to Facebook",
        twitter: "Share to Twitter",
        email: 'Share via e-Mail',
        subject: "Dig the sounds at Dig",
        body: "I'm sharing some sounds I found at dig.ccmixter: "
    }
    
};
