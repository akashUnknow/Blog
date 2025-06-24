export const RouteIndex = '/'
export const RouteSignup = '/sign-up'
export const RouteSignin = '/sign-in'
export const RouterProfile = '/profile'
export const RouterCategoriesDetailes = '/categories'
export const RouterAddCategories = '/categories/add'
export const RouterEditCategories = (categories_id)=>{
    if(categories_id){
        return '/categories/edit/${categories_id}'
    }else{
        return '/categories/edit:categories_id'
    }
}