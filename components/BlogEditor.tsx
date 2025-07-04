// 'use client'

// import dynamic from 'next/dynamic'
// import React from 'react'

// // Dynamically import MantineRTE only on the client
// const MantineRTE = dynamic(() => import('@mantine/rte').then(mod => mod.RichTextEditor), {
//   ssr: false, // ← THIS is the fix for document is not defined
// })

// interface Props {
//   value: string
//   onChange: (val: string) => void
// }

// const RichTextEditor: React.FC<Props> = ({ value, onChange }) => {
//   return (
//     <MantineRTE
//       value={value}
//       onChange={onChange}
//       sticky={false}
//       controls={[
//         ['bold', 'italic', 'underline', 'link'],
//         ['h1', 'h2', 'h3'],
//         ['unorderedList', 'orderedList'],
//         ['alignLeft', 'alignCenter', 'alignRight'],
//         ['sup', 'sub'],
//         ['image'],
//       ]}
//       style={{
//         minHeight: 300,
//         borderRadius: 8,
//         border: '1px solid #ccc',
//         padding: '1rem',
//         background: 'white',
//       }}
//     />
//   )
// }

// export default RichTextEditor


// 'use client'

// import React, { useState, useCallback } from 'react'
// import { EditorContent, useEditor } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import Image from '@tiptap/extension-image'
// import Underline from '@tiptap/extension-underline'
// import Link from '@tiptap/extension-link'
// import TextAlign from '@tiptap/extension-text-align'
// import Highlight from '@tiptap/extension-highlight'
// import TextStyle from '@tiptap/extension-text-style'

// import './editor.css' // we'll add styling next

// type Props = {
//   content: string
//   onChange: (content: string) => void
// }

// const BlogEditor: React.FC<Props> = ({ content, onChange }) => {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Underline,
//       Link,
//       Highlight,
//       TextStyle,
//       Image.configure({ inline: false }),
//       TextAlign.configure({ types: ['heading', 'paragraph'] }),
//     ],
//     content,
//     onUpdate: ({ editor }) => {
//       onChange(editor.getHTML())
//     },
//   })

//   const addImage = useCallback(() => {
//     const input = document.createElement('input')
//     input.type = 'file'
//     input.accept = 'image/*'

//     input.onchange = async () => {
//       const file = input.files?.[0]
//       if (!file) return

//       const formData = new FormData()
//       formData.append('file', file)

//       const res = await fetch('/api/upload', {
//         method: 'POST',
//         body: formData,
//       })

//       const data = await res.json()
//       if (data?.url) {
//         editor?.chain().focus().setImage({ src: data.url }).run()
//       }
//     }

//     input.click()
//   }, [editor])

//   return (
//     <div>
//       <div className="toolbar text-black">
//         <button onClick={() => editor?.chain().focus().toggleBold().run()} className={editor?.isActive('bold') ? 'active' : ''}>Bold</button>
//         <button onClick={() => editor?.chain().focus().toggleItalic().run()} className={editor?.isActive('italic') ? 'active' : ''}>Italic</button>
//         <button onClick={() => editor?.chain().focus().toggleUnderline().run()} className={editor?.isActive('underline') ? 'active' : ''}>Underline</button>
//         <button onClick={() => editor?.chain().focus().toggleHighlight().run()} className={editor?.isActive('highlight') ? 'active' : ''}>Highlight</button>
//         <button onClick={() => editor?.chain().focus().setTextAlign('left').run()}>Left</button>
//         <button onClick={() => editor?.chain().focus().setTextAlign('center').run()}>Center</button>
//         <button onClick={() => editor?.chain().focus().setTextAlign('right').run()}>Right</button>
//         <button onClick={addImage}>📷 Add Image</button>
//       </div>

//       <div className="editor-box w-full h-full">
        
//         <EditorContent editor={editor} className="blog-editor" />
//       </div>
//     </div>
//   )
// }

// export default BlogEditor





















// 'use client'

// import React, { useState, useCallback } from 'react'
// import { EditorContent, useEditor } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import Image, { ImageOptions } from '@tiptap/extension-image'
// import Underline from '@tiptap/extension-underline'
// import Link from '@tiptap/extension-link'
// import TextAlign from '@tiptap/extension-text-align'
// import Highlight from '@tiptap/extension-highlight'
// import TextStyle from '@tiptap/extension-text-style'
// import './editor.css'


// // 1. Define custom image attributes interface
// interface CustomImageAttributes {
//   src: string;
//   alt?: string;
//   title?: string;
//   'data-id'?: string;
// }

// // 2. Create custom image extension with proper typing
// const CustomImage = Image.extend<ImageOptions & { HTMLAttributes: CustomImageAttributes }>({
//   addAttributes() {
//     return {
//       ...this.parent?.(),
//       'data-id': {
//         default: null,
//       },
//       style: {
//         default: 'max-width: 100%; height: auto; display: inline-block; margin: 0.5rem 0;'
//       }
//     }
//   },
// })

// type Props = {
//   content: string
//   onChange: (content: string) => void
// }

// const BlogEditor: React.FC<Props> = ({ content, onChange }) => {
//   const [uploadedImages, setUploadedImages] = useState<{url: string, id: string}[]>([])

//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Underline,
//       Link,
//       Highlight,
//       TextStyle,
//       Image.configure({ 
//         inline: true,
//         HTMLAttributes: {
//           class: 'blog-image',
//         },
//       }),
//       TextAlign.configure({ types: ['heading', 'paragraph'] }),
//     ],
//     content,
//     onUpdate: ({ editor }) => {
//       onChange(editor.getHTML())
//     },
//   })

//   const addImage = useCallback(() => {
//     const input = document.createElement('input')
//     input.type = 'file'
//     input.accept = 'image/*'

//     input.onchange = async () => {
//       const file = input.files?.[0]
//       if (!file || !editor) return

//       try {
//         const formData = new FormData()
//         formData.append('file', file)

//         const res = await fetch('/api/upload', {
//           method: 'POST',
//           body: formData,
//         })

//         const data = await res.json()
//         if (data?.url) {
//           const imageId = `img-${Date.now()}`
//           editor.chain().focus().setImage({ 
//             src: data.url,
//             'data-id': imageId 
//           }as CustomImageAttributes).run()
          
//           setUploadedImages(prev => [...prev, { url: data.url, id: imageId }])
//         }
//       } catch (error) {
//         console.error('Image upload failed:', error)
//       }
//     }

//     input.click()
//   }, [editor])

//   const removeImage = useCallback((imageId: string) => {
//     if (!editor) return

//     // Get current transaction
//     const { state } = editor
//     const { tr } = state

//     // Find and remove the image node
//     state.doc.descendants((node, pos) => {
//       if (node.type.name === 'image' && node.attrs['data-id'] === imageId) {
//         // Delete the entire node including its space
//         tr.delete(pos, pos + node.nodeSize)
//       }
//     })

//      // Apply the transaction
//     editor.view.dispatch(tr)

//     // Remove from tracked images
//     setUploadedImages(prev => prev.filter(img => img.id !== imageId))
//   }, [editor])

//   return (
//     <div className="blog-editor-container">
//       <div className="toolbar text-black">
//         <button 
//           onClick={() => editor?.chain().focus().toggleBold().run()} 
//           className={editor?.isActive('bold') ? 'active' : ''}
//         >
//           Bold
//         </button>
//         <button 
//           onClick={() => editor?.chain().focus().toggleItalic().run()} 
//           className={editor?.isActive('italic') ? 'active' : ''}
//         >
//           Italic
//         </button>
//         <button 
//           onClick={() => editor?.chain().focus().toggleUnderline().run()} 
//           className={editor?.isActive('underline') ? 'active' : ''}
//         >
//           Underline
//         </button>
//         <button 
//           onClick={() => editor?.chain().focus().toggleHighlight().run()} 
//           className={editor?.isActive('highlight') ? 'active' : ''}
//         >
//           Highlight
//         </button>
//         <button onClick={() => editor?.chain().focus().setTextAlign('left').run()}>
//           Left
//         </button>
//         <button onClick={() => editor?.chain().focus().setTextAlign('center').run()}>
//           Center
//         </button>
//         <button onClick={() => editor?.chain().focus().setTextAlign('right').run()}>
//           Right
//         </button>
//         <button onClick={addImage}>📷 Add Image</button>
//       </div>

//       {/* Image preview section */}
//       {uploadedImages.length > 0 && (
//         <div className="uploaded-images-panel">
//           <h3>Uploaded Images</h3>
//           <div className="image-thumbnails ">
//             {uploadedImages.map((image) => (
//               <div key={image.id} className="image-thumbnail-container">
//                 <img 
//                   src={image.url} 
//                   alt="Preview" 
//                   className="image-thumbnail"
//                 />
//                 <button
//                   onClick={() => removeImage(image.id)}
//                   className="image-remove-button"
//                   aria-label="Remove image"
//                 >
//                   ×
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="editor-box w-full h-full">
//         <EditorContent editor={editor} className="blog-editor-content" />
//       </div>
//     </div>
//   )
// }

// export default BlogEditor













'use client'

import React, { useState, useCallback } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import TextStyle from '@tiptap/extension-text-style'
import { Bold, Italic, Underline as UnderlineIcon, Highlighter, AlignLeft, AlignCenter, AlignRight, ImagePlus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from 'react-hot-toast'

interface ImageAttributes {
  src: string
  alt?: string
  title?: string
  'data-id'?: string
  style?: string
}

const CustomImage = Image.extend({
  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      'data-id': {
        default: null,
      },
      style: {
        default: 'max-width: 100%; height: auto; display: block; margin: 1rem auto; border-radius: 0.5rem;'
      }
    }
  },
})


type Props = {
  content: string
  onChange: (content: string) => void
}

const BlogEditor: React.FC<Props> = ({ content, onChange }) => {
  const [uploadedImages, setUploadedImages] = useState<{url: string, id: string}[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Highlight.configure({
        multicolor: true,
      }),
      TextStyle,
      CustomImage.configure({ 
        inline: false,
        HTMLAttributes: {
          class: 'blog-image',
        },
      }),
      TextAlign.configure({ 
        types: ['heading', 'paragraph'],
        defaultAlignment: 'left'
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert prose-sm sm:prose-base max-w-none focus:outline-none min-h-[300px] p-4',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  const addImage = useCallback(async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'

    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file || !editor) return

      // Validate file
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB')
        return
      }

      try {
        setIsUploading(true)
        const formData = new FormData()
        formData.append('file', file)

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Upload failed')

        const imageId = `img-${Date.now()}`

        const imageAttributes: ImageAttributes = {
          src: data.url,
          alt: file.name,
          'data-id': imageId,
          style: 'max-width: 100%; height: auto; display: block; margin: 1rem auto; border-radius: 0.5rem;'
        }

        editor.chain().focus().setImage(imageAttributes).run()
        
        setUploadedImages(prev => [...prev, { url: data.url, id: imageId }])
        toast.success('Image uploaded successfully!')
      } catch (error) {
        console.error('Image upload failed:', error)
        toast.error('Failed to upload image')
      } finally {
        setIsUploading(false)
      }
    }

    input.click()
  }, [editor])

  const removeImage = useCallback((imageId: string) => {
    if (!editor) return

    const { state } = editor
    const { tr } = state

    state.doc.descendants((node, pos) => {
      if (node.type.name === 'image' && node.attrs['data-id'] === imageId) {
        tr.delete(pos, pos + node.nodeSize)
      }
    })

    editor.view.dispatch(tr)
    setUploadedImages(prev => prev.filter(img => img.id !== imageId))
    toast.success('Image removed')
  }, [editor])

  if (!editor) {
    return <div className="h-[300px] bg-muted/50 rounded-md animate-pulse" />
  }

  return (
    <Card className="overflow-hidden border border-muted">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-muted/50 border-b">
        <Button
          variant={editor.isActive('bold') ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Button>
        
        <Button
          variant={editor.isActive('italic') ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Button>
        
        <Button
          variant={editor.isActive('underline') ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>
        
        <Button
          variant={editor.isActive('highlight') ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
        >
          <Highlighter className="h-4 w-4" />
        </Button>
        
        <Button
          variant={editor.isActive({ textAlign: 'left' }) ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        
        <Button
          variant={editor.isActive({ textAlign: 'center' }) ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        
        <Button
          variant={editor.isActive({ textAlign: 'right' }) ? 'default' : 'ghost'}
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={addImage}
          disabled={isUploading}
          className="gap-1"
        >
          <ImagePlus className="h-4 w-4" />
          <span>Image</span>
        </Button>
      </div>

      {/* Uploaded Images Panel */}
      {uploadedImages.length > 0 && (
        <Card className="mx-4 mt-4">
          <ScrollArea className="h-[100px]">
            <div className="flex gap-3 p-3">
              {uploadedImages.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.url}
                    alt="Preview"
                    className="h-16 w-auto object-cover rounded-md border"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeImage(image.id)}
                    className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      )}

      {/* Editor Content */}
      <div className="p-1">
        <EditorContent 
          editor={editor} 
          className="rounded-b-md bg-background"
        />
      </div>
    </Card>
  )
}

export default BlogEditor