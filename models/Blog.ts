import mongoose, {Schema, models, model, Document} from "mongoose"

interface IBlog extends Document{
    title: string
    slug: string
    excerpt: string
    content: string
    date: string
    readTime: string
    views: number
    coverImage: string
    categories: string[]
}

const BlogSchema = new Schema<IBlog>(
    {
        title: {type: String, required: true},
        slug: {type:String, required: true, unique: true},
        excerpt: {type: String, required: true},
        content: {type: String, rewuired: true},
        date: {type:String, required: true},
        readTime: {type: String, required:true},
        views: {type:Number, default: 0},
        coverImage: {type: String, required: true},
        categories: [{type: String}],
    },
    {timestamps: true}
)

export const Blog = models.Blog || mongoose.model("Blog", BlogSchema)