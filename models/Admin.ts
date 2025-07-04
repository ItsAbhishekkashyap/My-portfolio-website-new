// models/Admin.ts
import mongoose, { Document, Model } from "mongoose"
import bcrypt from "bcryptjs"

// Admin interface with instance method
export interface IAdmin extends Document {
  email: string
  password: string
  role: string
  comparePassword(plain: string): Promise<boolean>
}

// Schema definition
const adminSchema = new mongoose.Schema<IAdmin>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
)

// Hash password before saving
adminSchema.pre<IAdmin>("save", async function (next) {
  if (!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

// Instance method to compare password
adminSchema.methods.comparePassword = function (plain: string): Promise<boolean> {
  return bcrypt.compare(plain, this.password)
}

// Export Admin model
export const Admin: Model<IAdmin> =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", adminSchema)
