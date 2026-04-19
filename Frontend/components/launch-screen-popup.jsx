'use client'

import { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { X } from 'lucide-react'

export function LaunchScreenPopup() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        let touchTimeout

        const handleUserInteraction = (e) => {
            // Don't open popup if clicking on buttons (arrows, navigation, etc)
            if (e.target.closest('button') || e.target.closest('a')) {
                return
            }

            // Open the dialog
            setIsOpen(true)

            // Clear any existing timeout
            if (touchTimeout) {
                clearTimeout(touchTimeout)
            }

            // Auto-close after 5 seconds
            touchTimeout = setTimeout(() => {
                setIsOpen(false)
            }, 5000)
        }

        // Add both touch and click event listeners to the entire document
        document.addEventListener('touchstart', handleUserInteraction)
        document.addEventListener('click', handleUserInteraction)

        return () => {
            document.removeEventListener('touchstart', handleUserInteraction)
            document.removeEventListener('click', handleUserInteraction)
            if (touchTimeout) {
                clearTimeout(touchTimeout)
            }
        }
    }, [])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent
                onClick={(e) => e.stopPropagation()}
                className="w-96 rounded-2xl border border-black/20 bg-gradient-to-br from-black/40 via-violet-900/30 to-blue-900/30 backdrop-blur-xl shadow-2xl p-8"
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 p-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors z-50"
                >
                    <X className="w-6 h-6 text-white" />
                </button>
                <DialogHeader>
                    <DialogTitle className="text-center text-white text-2xl font-bold tracking-tight pr-10">
                        Launching soon-stay tuned
                    </DialogTitle>
                </DialogHeader>
                <div className="flex justify-center py-6">
                    <div className="w-16 h-16 border-4 border-[#A78BFA] border-t-[#3B82F6] rounded-full animate-spin" />
                </div>
            </DialogContent>
        </Dialog>
    )
}
