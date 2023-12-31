export const base_url = "http://localhost:5000/api"
import p2 from "../assets/venuprofile.jpg"

export interface Users {
    profile?: string;
    name: string;
    message: string;
    time: string;
}

export const users = [
    {
        profile: p2,
        name: "venu gopal redddy ",
        message: "hi how are you",
        time: "Today",
    },
    {
        name: "Naga srinivas",
        message: "When you will reach",
        time: "Today",
    },
    {
        name: "Ram parakash",
        message: "Curently Working",
        time: "Yesterday",
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