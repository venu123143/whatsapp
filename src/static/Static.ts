// export const base_url = process.env.REACT_APP_CLIENT_URL
import p2 from "../assets/venuprofile.jpg"

export interface Users{
    message: string;
    time: string;
    unreadCount?: number;
}

{/* <section className={`${isCurrentLoading === true ? "block shadow-lg bg-black bg-opacity-70 w-full h-full m-auto" : "hidden"} cursor-pointer group-hover:block absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10 items-center`}>
            {
              isCurrentLoading &&
              <RingLoader
                color="#36d7b7"
                loading={isCurrentLoading}
                aria-label="Loading Spinner"
                speedMultiplier={1}
                data-testid="loader"
                size={500}
                className='m-auto'
              />
            }

          </section> */}
export const backgroundImages = ["https://bsmedia.business-standard.com/_media/bs/img/article/2023-04/01/full/1680325748-8096.jpg",
    "https://images.indianexpress.com/2023/10/whatsapp-logo-featured-express.jpg",
    "https://miro.medium.com/v2/resize:fit:720/format:webp/0*EnfvGEllIYzq6As9",
    "https://cdn.pixabay.com/photo/2021/05/24/17/07/whatsapp-6279868_1280.png",
    "https://www.meupositivo.com.br/doseujeito/wp-content/uploads/2021/03/webwhatsapp.jpg",
    "https://cdn.pixabay.com/photo/2016/04/27/20/39/whatsapp-1357489_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/21/08/44/whatsapp-1844471_1280.png",
    "https://images.unsplash.com/photo-1636751364472-12bfad09b451?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
]

export const powerStarImgs = [
    "https://e0.pxfuel.com/wallpapers/232/433/desktop-wallpaper-power-star-pawan-kalyan-pawankalyan.jpg",
    "https://funmauj.b-cdn.net/test/413011.jpg",
    "https://i.pinimg.com/564x/4f/ae/b3/4faeb3a538b79b16c699406e5ef7922f.jpg",
    "https://funmauj.b-cdn.net/test/351267.jpg",
    "https://i.pinimg.com/564x/e6/5e/cb/e65ecb12b33ae2cb57c3c819ccabd0e7.jpg",
    "https://i.pinimg.com/564x/c5/6c/92/c56c92f6dd761932196c74fd09891d9b.jpg"
]
export const users = [
    {
        profile: p2,
        name: "venu gopal redddy ",
        message: "hi how are you",
        time: "Today",
        unreadCount: 4,
    },
    {
        name: "Naga srinivas",
        message: "When you will reach",
        time: "Today",
        unreadCount: 3,
    },
    {
        name: "Ram parakash",
        message: "Curently Working",
        time: "Yesterday",
        unreadCount: 3,
    },
    {
        name: "Peddireddy",
        message: "come to Game...",
        time: "Yesterday",
    },
    {
        name: "Zuber",
        message: "Game @ 9",
        time: "Yesterday",
    },
    {
        name: "Anju",
        message: "Come to Jspiders soon",
        time: "Yesterday",
    },
    {
        name: "Nitin",
        message: "You topper..!",
        time: "25/10/23",
    },
    {
        name: "Muskan",
        message: "I am comming to hyd..!",
        time: "25/10/23",
    },
    {
        name: "Hrushikesh",
        message: "Position works differently",
        time: "25/10/23",
    },
]

export const dummyMessages = [
    {
        "message": "message 3 in day 100 ",
        "date": "2023-09-24T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 100 ",
        "date": "2023-09-24T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 100 ",
        "date": "2023-09-24T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 99 ",
        "date": "2023-09-25T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 99 ",
        "date": "2023-09-25T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 99 ",
        "date": "2023-09-25T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 98 ",
        "date": "2023-09-26T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 98 ",
        "date": "2023-09-26T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 98 ",
        "date": "2023-09-26T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 97 ",
        "date": "2023-09-27T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 97 ",
        "date": "2023-09-27T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 97 ",
        "date": "2023-09-27T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 96 ",
        "date": "2023-09-28T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 96 ",
        "date": "2023-09-28T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 96 ",
        "date": "2023-09-28T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 95 ",
        "date": "2023-09-29T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 95 ",
        "date": "2023-09-29T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 95 ",
        "date": "2023-09-29T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 94 ",
        "date": "2023-09-30T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 94 ",
        "date": "2023-09-30T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 94 ",
        "date": "2023-09-30T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 93 ",
        "date": "2023-10-01T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 93 ",
        "date": "2023-10-01T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 93 ",
        "date": "2023-10-01T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 92 ",
        "date": "2023-10-02T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 92 ",
        "date": "2023-10-02T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 92 ",
        "date": "2023-10-02T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 91 ",
        "date": "2023-10-03T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 91 ",
        "date": "2023-10-03T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 91 ",
        "date": "2023-10-03T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 90 ",
        "date": "2023-10-04T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 90 ",
        "date": "2023-10-04T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 90 ",
        "date": "2023-10-04T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 89 ",
        "date": "2023-10-05T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 89 ",
        "date": "2023-10-05T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 89 ",
        "date": "2023-10-05T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 88 ",
        "date": "2023-10-06T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 88 ",
        "date": "2023-10-06T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 88 ",
        "date": "2023-10-06T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 87 ",
        "date": "2023-10-07T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 87 ",
        "date": "2023-10-07T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 87 ",
        "date": "2023-10-07T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 86 ",
        "date": "2023-10-08T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 86 ",
        "date": "2023-10-08T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 86 ",
        "date": "2023-10-08T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 85 ",
        "date": "2023-10-09T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 85 ",
        "date": "2023-10-09T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 85 ",
        "date": "2023-10-09T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 84 ",
        "date": "2023-10-10T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 84 ",
        "date": "2023-10-10T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 84 ",
        "date": "2023-10-10T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 83 ",
        "date": "2023-10-11T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 83 ",
        "date": "2023-10-11T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 83 ",
        "date": "2023-10-11T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 82 ",
        "date": "2023-10-12T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 82 ",
        "date": "2023-10-12T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 82 ",
        "date": "2023-10-12T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 81 ",
        "date": "2023-10-13T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 81 ",
        "date": "2023-10-13T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 81 ",
        "date": "2023-10-13T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 80 ",
        "date": "2023-10-14T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 80 ",
        "date": "2023-10-14T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 80 ",
        "date": "2023-10-14T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 79 ",
        "date": "2023-10-15T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 79 ",
        "date": "2023-10-15T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 79 ",
        "date": "2023-10-15T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 78 ",
        "date": "2023-10-16T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 78 ",
        "date": "2023-10-16T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 78 ",
        "date": "2023-10-16T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 77 ",
        "date": "2023-10-17T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 77 ",
        "date": "2023-10-17T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 77 ",
        "date": "2023-10-17T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 76 ",
        "date": "2023-10-18T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 76 ",
        "date": "2023-10-18T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 76 ",
        "date": "2023-10-18T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 75 ",
        "date": "2023-10-19T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 75 ",
        "date": "2023-10-19T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 75 ",
        "date": "2023-10-19T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 74 ",
        "date": "2023-10-20T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 74 ",
        "date": "2023-10-20T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 74 ",
        "date": "2023-10-20T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 73 ",
        "date": "2023-10-21T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 73 ",
        "date": "2023-10-21T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 73 ",
        "date": "2023-10-21T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 72 ",
        "date": "2023-10-22T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 72 ",
        "date": "2023-10-22T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 72 ",
        "date": "2023-10-22T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 71 ",
        "date": "2023-10-23T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 71 ",
        "date": "2023-10-23T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 71 ",
        "date": "2023-10-23T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 70 ",
        "date": "2023-10-24T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 70 ",
        "date": "2023-10-24T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 70 ",
        "date": "2023-10-24T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 69 ",
        "date": "2023-10-25T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 69 ",
        "date": "2023-10-25T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 69 ",
        "date": "2023-10-25T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 68 ",
        "date": "2023-10-26T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 68 ",
        "date": "2023-10-26T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 68 ",
        "date": "2023-10-26T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 67 ",
        "date": "2023-10-27T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 67 ",
        "date": "2023-10-27T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 67 ",
        "date": "2023-10-27T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 66 ",
        "date": "2023-10-28T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 66 ",
        "date": "2023-10-28T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 66 ",
        "date": "2023-10-28T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 65 ",
        "date": "2023-10-29T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 65 ",
        "date": "2023-10-29T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 65 ",
        "date": "2023-10-29T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 64 ",
        "date": "2023-10-30T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 64 ",
        "date": "2023-10-30T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 64 ",
        "date": "2023-10-30T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 63 ",
        "date": "2023-10-31T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 63 ",
        "date": "2023-10-31T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 63 ",
        "date": "2023-10-31T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 62 ",
        "date": "2023-11-01T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 62 ",
        "date": "2023-11-01T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 62 ",
        "date": "2023-11-01T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 61 ",
        "date": "2023-11-02T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 61 ",
        "date": "2023-11-02T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 61 ",
        "date": "2023-11-02T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 60 ",
        "date": "2023-11-03T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 60 ",
        "date": "2023-11-03T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 60 ",
        "date": "2023-11-03T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 59 ",
        "date": "2023-11-04T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 59 ",
        "date": "2023-11-04T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 59 ",
        "date": "2023-11-04T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 58 ",
        "date": "2023-11-05T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 58 ",
        "date": "2023-11-05T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 58 ",
        "date": "2023-11-05T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 57 ",
        "date": "2023-11-06T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 57 ",
        "date": "2023-11-06T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 57 ",
        "date": "2023-11-06T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 56 ",
        "date": "2023-11-07T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 56 ",
        "date": "2023-11-07T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 56 ",
        "date": "2023-11-07T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 55 ",
        "date": "2023-11-08T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 55 ",
        "date": "2023-11-08T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 55 ",
        "date": "2023-11-08T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 54 ",
        "date": "2023-11-09T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 54 ",
        "date": "2023-11-09T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 54 ",
        "date": "2023-11-09T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 53 ",
        "date": "2023-11-10T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 53 ",
        "date": "2023-11-10T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 53 ",
        "date": "2023-11-10T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 52 ",
        "date": "2023-11-11T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 52 ",
        "date": "2023-11-11T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 52 ",
        "date": "2023-11-11T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 51 ",
        "date": "2023-11-12T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 51 ",
        "date": "2023-11-12T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 51 ",
        "date": "2023-11-12T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 50 ",
        "date": "2023-11-13T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 50 ",
        "date": "2023-11-13T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 50 ",
        "date": "2023-11-13T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 49 ",
        "date": "2023-11-14T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 49 ",
        "date": "2023-11-14T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 49 ",
        "date": "2023-11-14T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 48 ",
        "date": "2023-11-15T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 48 ",
        "date": "2023-11-15T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 48 ",
        "date": "2023-11-15T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 47 ",
        "date": "2023-11-16T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 47 ",
        "date": "2023-11-16T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 47 ",
        "date": "2023-11-16T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 46 ",
        "date": "2023-11-17T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 46 ",
        "date": "2023-11-17T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 46 ",
        "date": "2023-11-17T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 45 ",
        "date": "2023-11-18T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 45 ",
        "date": "2023-11-18T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 45 ",
        "date": "2023-11-18T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 44 ",
        "date": "2023-11-19T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 44 ",
        "date": "2023-11-19T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 44 ",
        "date": "2023-11-19T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 43 ",
        "date": "2023-11-20T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 43 ",
        "date": "2023-11-20T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 43 ",
        "date": "2023-11-20T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 42 ",
        "date": "2023-11-21T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 42 ",
        "date": "2023-11-21T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 42 ",
        "date": "2023-11-21T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 41 ",
        "date": "2023-11-22T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 41 ",
        "date": "2023-11-22T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 41 ",
        "date": "2023-11-22T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 40 ",
        "date": "2023-11-23T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 40 ",
        "date": "2023-11-23T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 40 ",
        "date": "2023-11-23T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 39 ",
        "date": "2023-11-24T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 39 ",
        "date": "2023-11-24T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 39 ",
        "date": "2023-11-24T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 38 ",
        "date": "2023-11-25T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 38 ",
        "date": "2023-11-25T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 38 ",
        "date": "2023-11-25T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 37 ",
        "date": "2023-11-26T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 37 ",
        "date": "2023-11-26T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 37 ",
        "date": "2023-11-26T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 36 ",
        "date": "2023-11-27T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 36 ",
        "date": "2023-11-27T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 36 ",
        "date": "2023-11-27T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 35 ",
        "date": "2023-11-28T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 35 ",
        "date": "2023-11-28T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 35 ",
        "date": "2023-11-28T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 34 ",
        "date": "2023-11-29T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 34 ",
        "date": "2023-11-29T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 34 ",
        "date": "2023-11-29T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 33 ",
        "date": "2023-11-30T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 33 ",
        "date": "2023-11-30T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 33 ",
        "date": "2023-11-30T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 32 ",
        "date": "2023-12-01T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 32 ",
        "date": "2023-12-01T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 32 ",
        "date": "2023-12-01T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 31 ",
        "date": "2023-12-02T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 31 ",
        "date": "2023-12-02T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 31 ",
        "date": "2023-12-02T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 30 ",
        "date": "2023-12-03T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 30 ",
        "date": "2023-12-03T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 30 ",
        "date": "2023-12-03T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 29 ",
        "date": "2023-12-04T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 29 ",
        "date": "2023-12-04T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 29 ",
        "date": "2023-12-04T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 28 ",
        "date": "2023-12-05T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 28 ",
        "date": "2023-12-05T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 28 ",
        "date": "2023-12-05T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 27 ",
        "date": "2023-12-06T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 27 ",
        "date": "2023-12-06T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 27 ",
        "date": "2023-12-06T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 26 ",
        "date": "2023-12-07T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 26 ",
        "date": "2023-12-07T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 26 ",
        "date": "2023-12-07T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 25 ",
        "date": "2023-12-08T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 25 ",
        "date": "2023-12-08T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 25 ",
        "date": "2023-12-08T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 24 ",
        "date": "2023-12-09T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 24 ",
        "date": "2023-12-09T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 24 ",
        "date": "2023-12-09T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 23 ",
        "date": "2023-12-10T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 23 ",
        "date": "2023-12-10T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 23 ",
        "date": "2023-12-10T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 22 ",
        "date": "2023-12-11T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 22 ",
        "date": "2023-12-11T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 22 ",
        "date": "2023-12-11T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 21 ",
        "date": "2023-12-12T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 21 ",
        "date": "2023-12-12T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 21 ",
        "date": "2023-12-12T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 20 ",
        "date": "2023-12-13T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 20 ",
        "date": "2023-12-13T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 20 ",
        "date": "2023-12-13T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 19 ",
        "date": "2023-12-14T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 19 ",
        "date": "2023-12-14T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 19 ",
        "date": "2023-12-14T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 18 ",
        "date": "2023-12-15T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 18 ",
        "date": "2023-12-15T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 18 ",
        "date": "2023-12-15T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 17 ",
        "date": "2023-12-16T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 17 ",
        "date": "2023-12-16T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 17 ",
        "date": "2023-12-16T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 16 ",
        "date": "2023-12-17T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 16 ",
        "date": "2023-12-17T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 16 ",
        "date": "2023-12-17T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 15 ",
        "date": "2023-12-18T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 15 ",
        "date": "2023-12-18T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 15 ",
        "date": "2023-12-18T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 14 ",
        "date": "2023-12-19T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 14 ",
        "date": "2023-12-19T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 14 ",
        "date": "2023-12-19T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 13 ",
        "date": "2023-12-20T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 13 ",
        "date": "2023-12-20T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 13 ",
        "date": "2023-12-20T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 12 ",
        "date": "2023-12-21T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 12 ",
        "date": "2023-12-21T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 12 ",
        "date": "2023-12-21T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 11 ",
        "date": "2023-12-22T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 11 ",
        "date": "2023-12-22T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 11 ",
        "date": "2023-12-22T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 10 ",
        "date": "2023-12-23T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 10 ",
        "date": "2023-12-23T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 10 ",
        "date": "2023-12-23T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 9 ",
        "date": "2023-12-24T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 9 ",
        "date": "2023-12-24T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 9 ",
        "date": "2023-12-24T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 8 ",
        "date": "2023-12-25T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 8 ",
        "date": "2023-12-25T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 8 ",
        "date": "2023-12-25T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 7 ",
        "date": "2023-12-26T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 7 ",
        "date": "2023-12-26T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 7 ",
        "date": "2023-12-26T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 6 ",
        "date": "2023-12-27T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 6 ",
        "date": "2023-12-27T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 6 ",
        "date": "2023-12-27T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 5 ",
        "date": "2023-12-28T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 5 ",
        "date": "2023-12-28T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 5 ",
        "date": "2023-12-28T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 4 ",
        "date": "2023-12-29T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 4 ",
        "date": "2023-12-29T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 4 ",
        "date": "2023-12-29T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 3 ",
        "date": "2023-12-30T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 3 ",
        "date": "2023-12-30T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 3 ",
        "date": "2023-12-30T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 2 ",
        "date": "2023-12-31T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 2 ",
        "date": "2023-12-31T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 2 ",
        "date": "2023-12-31T10:59:58.513Z"
    },
    {
        "message": "message 3 in day 1 ",
        "date": "2024-01-01T10:59:58.513Z"
    },
    {
        "message": "message 2 in day 1 ",
        "date": "2024-01-01T10:59:58.513Z"
    },
    {
        "message": "message 1 in day 1 ",
        "date": "2024-01-01T10:59:58.513Z"
    }
]