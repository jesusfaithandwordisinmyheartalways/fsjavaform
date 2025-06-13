


import META_LOGO from '../Images/meta.png'
import META_LOGO_TWO from '../Images/meta_logo.png'





interface FB<T> {
    fbImage:T,
    metaImage:T
}



const Facebook:FB<string>[] = [

    {
        fbImage: META_LOGO,
        metaImage:META_LOGO_TWO

    }

]



export { Facebook }