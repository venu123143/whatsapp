// export const base_url = process.env.REACT_APP_CLIENT_URL
import p2 from "../assets/venuprofile.jpg"

export interface Users {
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

export const recieveColors = {
    red: "text-red-500",
    green: "text-purple-500",
    yellow: "text-yellow-600",
    pink: "text-pink-600",
    blue: "text-blue-500"
}