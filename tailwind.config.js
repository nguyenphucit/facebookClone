/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",'./public/index.html'
  ],
  theme: {
    extend: {
      boxShadow:{
        'loginForm':'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        'settingForm':'rgba(0, 0, 0, 0.35) 0px 3px 6px',
        'navBar':'-1px 8px 0px -5px rgba(170,168,168,0.15)'
      },
      width:{
        '90':'22.5rem',
        '108':'27rem',
        '112.5':"28.125rem",
        '3/9':'30%',
        '9/10':'90%',
        '84.5':'21.125rem',
        '98/100':'98%',
        '125':'31.25rem',
        '107':'26.75rem',
        '235':"58.75rem",
        '42':"10.5rem",
        '175':'43.75rem',
        '86':'21.5rem'
      },
      height:{
        '134':'33.5rem',
        '42':"10.5rem",
        '95':'23.75rem',
        '113.75':'28.4375rem',
        '17':'5rem',
        '108':'27rem',
        '3/9':'30%',
        '125':'31.25rem',
        '107':'26.75rem',
        '112.5':"28.125rem",
        '252.5':"63.125rem",
        '158':'39.5rem',
        '91':'22.75rem',
        '115':'28.75rem',
        '23.5':'5.875rem'
      },
      minHeight:{
        '134':"33.5rem"
      },
      border:{
        '1':"1px",
        'main':"#ced0d4"
      },
     fontSize:{
      'xsm':'11px'
     },
     backgroundColor:{
      'loginMain':"#fcfcfd",
      'loginBtn':"#42b72a",
      'loginBtnHover':'#36a420',
      'messageBtn':"#ebf5ff",
      'newFeedmain':'#f0f2f5',
      'hover':'#D8DADF',
      'iconHover':'#F2F2F2',
      'primary':"#0866ff",
      'GlobalHover':'rgba(0,0,0,0.6)',
      'onlineStatus':"#6edb3f",
      'boldprimary':"#0064da",
      'loading':"linear-gradient(#b5b5b5 0 0) padding-box,linear-gradient(rgba(255,255,255,0.1) 33%, rgba(255,255,255,0.5) 66%, rgba(255,255,255,1) 100%) border-box"
     },
   backgroundImage:{
    loading:"linear-gradient(#b5b5b5 0 0) padding-box,linear-gradient(rgba(255,255,255,0.1) 33%, rgba(255,255,255,0.5) 66%, rgba(255,255,255,1) 100%) border-box"
   },
     textColor:{
      'primary':'#0866ff',
      'boldprimary':"#0064da",
      'registerLabel':'#606770'
     },
     fontSize:{
      'commentAuthor':'.8125rem',
      'commentContent':'.9375rem',
      'chatContent':'.9375rem'
     },
     screens:{
      xs: {'max':'680px'},
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
     }
    },
    animation:{
      loading:"spin .8s linear infinite"
    }
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true,important:true }),
    require("tailwindcss"),
    require('autoprefixer'),
  ],
}