// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import { Dialog } from "@headlessui/react"

// const certificates = [
//   {
//     id: 1,
//     title: "AI & ML Certificate",
//     image: "/certificates/aiml.jpg", // put your images in public/certificates/
//   },
//   {
//     id: 2,
//     title: "Web Development Bootcamp",
//     image: "/certificates/webdev.jpg",
//   },
//   {
//     id: 3,
//     title: "Hackathon Winner",
//     image: "/certificates/hackathon.jpg",
//   },
//   // Add more here
// ]

// export default function Achievements() {
//   const [selected, setSelected] = useState<string | null>(null)

//   return (
//     <section className="py-12 px-6 bg-background text-foreground" id="achievements">
//       <h2 className="text-3xl font-bold text-center mb-8">🏆 My Achievements</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {certificates.map((cert) => (
//           <div
//             key={cert.id}
//             className="group relative cursor-pointer overflow-hidden rounded-lg border border-muted transition hover:scale-105"
//             onClick={() => setSelected(cert.image)}
//           >
//             <Image
//               src={cert.image}
//               alt={cert.title}
//               width={600}
//               height={400}
//               className="object-cover w-full h-48"
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
//               {cert.title}
//             </div>
//           </div>
//         ))}
//       </div>

//       <Dialog open={!!selected} onClose={() => setSelected(null)} className="relative z-50">
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
//           <Dialog.Panel className="max-w-3xl w-full">
//             {selected && (
//               <Image
//                 src={selected}
//                 alt="Selected Certificate"
//                 width={1200}
//                 height={800}
//                 className="rounded shadow-lg"
//               />
//             )}
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </section>
//   )
// }





import React from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";

export function DraggableCardDemo() {
  const items = [
    {
      title: "HULT PRIZE",
      image:
        "/certificates/hultprize.jpg",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    
    
    
    {
      title: "Taekwondo Silver 🥈",
      image:
        "/certificates/nationalsilver.jpg",
      className: "absolute top-8 left-[30%] rotate-[4deg]",
    },
  ];
  return (
    <DraggableCardContainer className="relative  flex min-h-screen w-full items-center justify-center overflow-clip">
      <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-4xl font-black text-foreground md:text-6xl ">
       Achievements 🏆
      </p>
      {items.map((item) => (
        <DraggableCardBody className={item.className}>
          <img
            src={item.image}
            alt={item.title}
            className="pointer-events-none relative z-10 h-80 w-80 object-cover"
          />
          <h3 className="mt-4 text-center text-2xl font-bold text-foreground">
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}
