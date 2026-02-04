const mongoose = require('mongoose');
const Gallery = require('./models/Gallery');
const connectDB = require('./config/database');
require('dotenv').config();

const images = [
    "531267600_122192837840323501_9051706052552976235_n.jpg",
    "531321886_122192838386323501_5644992633937116904_n.jpg",
    "531915873_122192826506323501_1474398108542282301_n.jpg",
    "532952631_122192829872323501_7096041500131764488_n.jpg",
    "533426618_122192835578323501_7983431721646127892_n.jpg",
    "536449034_122194131488323501_2342553518838993455_n.jpg",
    "537183244_122194132754323501_561427149018867550_n.jpg",
    "537196538_122194131728323501_7389790112721837253_n.jpg",
    "537503669_122194122764323501_3183659042553273899_n.jpg",
    "572034355_122202289256323501_6744761754658871648_n.jpg",
    "572793645_122202282308323501_4046496682102930801_n.jpg",
    "572982058_122202798740323501_9219638528661601867_n.jpg",
    "573290160_122202288656323501_7616314258722620726_n.jpg",
    "574571365_122202800750323501_255958645158492736_n.jpg",
    "587383434_122205723740323501_2203853609309990087_n.jpg",
    "587794453_122205730034323501_8734500952573812662_n.jpg",
    "588748762_122205730778323501_3913838982836685223_n.jpg",
    "589059589_122205728912323501_421651150332517788_n.jpg",
    "589655435_122205724988323501_5501249434205615478_n.jpg",
    "590584762_122205730766323501_7930747301615616501_n.jpg",
    "590762674_122205725180323501_1055877288810737055_n.jpg"
];

const categories = ['Match', 'Event', 'Tournament', 'Training', 'Achievement'];

const seedGallery = async () => {
    try {
        await connectDB();
        console.log('Database connected...');

        // Clear existing gallery items
        await Gallery.deleteMany({});
        console.log('Cleared existing gallery items.');

        const galleryItems = [];

        // Randomly assign images to categories
        images.forEach((img, index) => {
            const category = categories[index % categories.length];
            const item = {
                title: `Sports Moment ${index + 1}`,
                description: "Creating memories and celebrating victories on the field.",
                category: category,
                images: [{
                    url: `/images/gallery/${img}`,
                    caption: `Action shot from ${category} event`,
                    uploadDate: new Date()
                }],
                isPublished: true,
                likes: Math.floor(Math.random() * 50) + 10
            };
            galleryItems.push(item);
        });

        await Gallery.insertMany(galleryItems);
        console.log(`Successfully seeded ${galleryItems.length} gallery items.`);

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedGallery();
