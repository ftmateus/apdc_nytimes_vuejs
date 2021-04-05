const news = Vue.extend
({//:style="{'background-image': news.photo != null ? 'url(' + news.photo.url + ')' : '' , 'background-repeat': 'no-repeat'}"
    props: ["news"],
    template: `
        <div  class="news_container">
            <img class="news_image" :src="news.photo != null ? news.photo.url : ''">
            <h2 class="news_title"><a :href="news.url" target="_blank">{{ news.title }}</a></h2>
            <h4 class="news_abstract">{{ news.abstract }}</h4>
        </div>
    `
    
})
Vue.component("news", news)

const app = new Vue
({
    el: "#app",
    data: 
    {
        news_data: []
    },
    computed:
    {

    },
    watch:
    {

    },
    methods:
    {

    },
    mounted()
    {
        axios.get("./data").then(response => {
            this.news_data = response.data
        }) 
    }

})


// window.onload = function()
// {
//     console.log("Hello World")
// }
