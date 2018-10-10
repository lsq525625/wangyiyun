let music = new Vue({
    el: '#music',
    data: {
        //歌名
        musicName: '',
        //歌曲列表
        musicList: [],
        //歌曲的播放地址
        musicUrl: [],
        // 歌曲封面url地址
        picUrl: '',
        // 评论数组
        commentsList: []
    },
    methods: {
        //搜索歌曲
        search() {
            if (this.musicName != '') {
                axios.get('https://autumnfish.cn/search?keywords=' + this.musicName).then(response => {
                    // console.log(response);
                    // 保存数据
                    this.musicList = response.data.result.songs
                })
            } else {
                alert('输入内容不能为为空')
            }
        },
        //播放歌曲
        playMusic(id) {
            //console.log(id);
            axios.get('https://autumnfish.cn/music/url?id=' + id).then(response => {
                // console.log(response);
                // 保存数据
                this.musicUrl = response.data.data[0].url
            })
            //歌曲封面
            // 调用接口获取歌曲封面即可
            axios.get("https://autumnfish.cn/song/detail?ids=" + id).then(response => {

                this.picUrl = response.data.songs[0].al.picUrl;
                //console.log(response);
            })
            //查询歌曲评论
            axios.get('https://autumnfish.cn/comment/music?limit=1&id=' + id)
                .then(response => {
                    // console.log(response);
                    this.commentsList = response.data.hotComments;
                })

        }
    }
})

//歌曲播放事件
document.querySelector('audio').onplay = function () {
    //移除暂停
    document.querySelector('.pic').classList.remove('pause');
    // 添加播放类名
    document.querySelector('.pic').classList.add('rotate')
}
//歌曲暂停事件
document.querySelector('audio').onpause = function () {
    document.querySelector('.pic').classList.add('pause');
}