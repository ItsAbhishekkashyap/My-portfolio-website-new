// lib/validators.ts
export function validateBlogPost(data: any) {
  const errors = []
  
  if (!data.title || data.title.trim().length < 5) {
    errors.push("Title must be at least 5 characters")
  }
  
  if (!data.slug || !/^[a-z0-9-]+$/.test(data.slug)) {
    errors.push("Slug must be lowercase with hyphens only")
  }
  
  if (!data.content || data.content.trim().length < 100) {
    errors.push("Content must be at least 100 characters")
  }
  
  return errors
}