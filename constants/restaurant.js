import icons from './icons';
import images from './images';

export const categoryData = [
    {
        id: 1,
        name: "Rice",
        icon: icons.rice_bowl,
    },
    {
        id: 2,
        name: "Noodles",
        icon: icons.noodle,
    },
    {
        id: 3,
        name: "Hot Dogs",
        icon: icons.hotdog,
    },
    {
        id: 4,
        name: "Salads",
        icon: icons.salad,
    },
    {
        id: 5,
        name: "Burgers",
        icon: icons.hamburger,
    },
    {
        id: 6,
        name: "Pizza",
        icon: icons.pizza,
    },
    {
        id: 7,
        name: "Snacks",
        icon: icons.fries,
    },
    {
        id: 8,
        name: "Sushi",
        icon: icons.sushi,
    },
    {
        id: 9,
        name: "Desserts",
        icon: icons.donut,
    },
    {
        id: 10,
        name: "Drinks",
        icon: icons.drink,
    },
]

// price rating
const affordable = 1
const fairPrice = 2
const expensive = 3

export const restaurantData = [
    {
        id: 1,
        name: "Mr.Beef",
        rating: 4.8,
        categories: [5, 7],
        priceRating: affordable,
        icon: icons.hamburger,
        photo: images.burger_restaurant_1,
        duration: "25 - 30 min",
        location: {
            latitude: 10.756129, 
            longitude: 106.675715
        },
        courier: {
            avatar: images.avatar_1,
            name: "Ánh"
        },
        menu: [
            {
                menuId: 1,
                name: "Beef Burger",
                photo: images.Beef_Burger,
                description: "Juiciest beefiest treat you'll ever have together with freshly picked tomatoes and lettuce",
                calories: 200,
                price: 50000
            },
            {
                menuId: 2,
                name: "Chicken Buger",
                photo: images.Chicken_Burger,
                description: "Cruchy crispy Chicken Burger",
                calories: 250,
                price: 40000
            },
            {
                menuId: 3,
                name: "Caesar Salad",
                photo: images.Caesar_Salad,
                description: "Julius Caesar Approved",
                calories: 194,
                price: 30000
            }
        ]
    },
    {
        id: 2,
        name: "Toucha Pizzeria",
        rating: 4.8,
        categories: [2, 4, 6],
        priceRating: expensive,
        photo: images.PizzaRestautrant,
        icon: icons.pizza,
        duration: "25 - 30 min",
        location: {
            latitude: 10.767756, 
            longitude: 106.683713
        },
        courier: {
            avatar: images.avatar_2,
            name: "Phú"
        },
        menu: [
            {
                menuId: 4,
                name: "Cheese Pizza",
                photo: images.ChessePizza,
                description: "It's just pizza... with cheese, nothing can go wrong",
                calories: 350,
                price: 150000
            },
            {
                menuId: 5,
                name: "Pineapple Pizza",
                photo: images.PineapplePizza ,
                description: "Ewww... Disgusting",
                calories: 300,
                price: 120000
            },
            {
                menuId: 6,
                name: "Spaghetti",
                photo: images.Spaghetti,
                description: "Don't let anyone touch your Spaghet!",
                calories: 300,
                price: 100000
            },
            {
                menuId: 7,
                name: "Mediterranean Chopped Salad ",
                photo: images.MediterraneanSalad,
                description: "Finely chopped lettuce, tomatoes, cucumbers with the fresh, and romantic, scent of the Mediterranean",
                calories: 100,
                price: 100000
            }
        ]
    },
    {
        id: 3,
        name: "Just Hotdogs",
        rating: 4.8,
        categories: [3],
        priceRating: expensive,
        photo: images.Hotdog,
        icon: icons.hotdog,
        duration: "15 - 20 min",
        location: {
            latitude: 10.784426, 
            longitude: 106.6711439
        },
        courier: {
            avatar: images.avatar_3,
            name: "Khoa"
        },
        menu: [
            {
                menuId: 8,
                name: "Chicago Style Hot Dog",
                photo: images.Hotdog,
                description: "All beef hot dogs and only this one is on the menu",
                calories: 100,
                price: 60000
            }
        ]
    },
    {
        id: 4,
        name: "Sushi Restaurant",
        rating: 4.8,
        categories: [8],
        priceRating: expensive,
        photo: images.SushiRestaurant,
        icon: icons.sushi,
        duration: "30 - 40 min",
        location: {
            latitude: 10.7728416,
            longitude: 106.6742267
        },
        courier: {
            avatar: images.avatar_4,
            name: "Toàn"
        },
        menu: [
            {
                menuId: 9,
                name: "Sushi sets",
                photo: images.Sushi, 
                description: "Fresh sashimi, sushi rice, おあがりよ",
                calories: 100,
                price: 500000
            }
        ]
    },
    {
        id: 5,
        name: "Phở Hảo Hán",
        rating: 4.8,
        categories: [1, 2],
        priceRating: affordable,
        photo: images.PhoRestaurant,
        icon: icons.noodle,
        duration: "20 - 25 min",
        location: {
            latitude: 10.761669, 
            longitude: 106.682977
        },
        courier: {
            avatar: images.avatar_4,
            name: "Cường"
        },
        menu: [
            {
                menuId: 10,
                name: "Phở Tái",
                photo: images.PhoTai,
                description: "Why is the meat raw?!? Oh, never mind it's cooked",
                calories: 200,
                price: 30000
            },
            {
                menuId: 11,
                name: "Phở Tái Nạm",
                photo: images.TaiNam,
                description: "Just like tái but added cooked beef",
                calories: 300,
                price: 40000
            },
            {
                menuId: 12,
                name: "Bún bò Huế",
                photo: images.BunBo,
                description: "Literally the best Vietnamese Noodle bowl, no cap not ever trolling bro",
                calories: 300,
                price: 50000
            },
            {
                menuId: 13,
                name: "Bánh Canh Hải Sản",
                photo: images.BanhCanh,
                description: "Your a baby but that's okay because this is tasty",
                calories: 300,
                price: 60000
            },

        ]
    },
    {

        id: 6,
        name: "Tráng Miệng Người Già",
        rating: 4.9,
        categories: [9, 10],
        priceRating: affordable,
        photo: images.JoeBiden,
        icon: icons.ice_cream,
        duration: "10 - 15 min",
        location: {
            latitude: 10.763626, 
            longitude: 106.669523
        },
        courier: {
            avatar: images.avatar_1,
            name: "Khuê"
        },
        menu: [
            {
                menuId: 12,
                name: "Vanilla Ice Cream",
                photo: images.Vanilla,
                description: "You're basic",
                calories: 100,
                price: 20000
            },
            {
                menuId: 13,
                name: "Chocolate Ice Cream",
                photo: images.Chocolate,
                description: "You've been told your basic, so now you're basic with extra steps",
                calories: 100,
                price: 30000
            },
            {
                menuId: 14,
                name: "Banh Pía",
                photo: images.BanhPia,
                description: "Sóc Trăng sacred gems",
                calories: 300,
                price: 50000
            }
        ]
    }
]