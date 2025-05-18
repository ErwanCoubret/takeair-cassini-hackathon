import React, { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

type ModalProps = {
    children: React.ReactNode
    showState: boolean
    setShowState: (value: boolean) => void
}

export default function Modal({ children, showState, setShowState }: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null)
    const clickOutside = useRef(false)

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        setShowState(false)
        return null
    }


    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            clickOutside.current = true
        } else {
            clickOutside.current = false
        }
    }

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (
            clickOutside.current &&
            modalRef.current &&
            !modalRef.current.contains(e.target as Node)
        ) {
            setShowState(false)
        }
    }

    if (typeof window === "undefined") return null

    return createPortal(
        <div
            className={`z-50 fixed flex top-0 left-0 w-screen h-screen items-center justify-center bg-slate-950/40 transition-opacity duration-300 xl:p-32 ${showState ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <div
                ref={modalRef}
                className="relative bg-gray-1 xl:w-4/5 2xl:w-3/5 w-full lg:-[90vw] lg:rounded-md p-2 xl:p-10 h-full lg:h-fit lg:max-h-[80vh]"
            >
                <div className="w-full z-20 p-3 custom-scroll overflow-y-auto">{children}</div>
            </div>
        </div>,
        document.body
    )
}
