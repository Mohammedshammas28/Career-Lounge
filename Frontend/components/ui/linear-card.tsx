'use client';
import React, {
  useCallback, useContext, useEffect, useId, useMemo, useRef, useState, forwardRef
} from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { cn } from '@/lib/utils';
import { XIcon, Plus } from 'lucide-react';

const DialogContext = React.createContext(null);

function useDialog() {
  const context = useContext(DialogContext);
  if (!context) throw new Error('useDialog must be used within a DialogProvider');
  return context;
}

function DialogProvider({ children, transition }) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const triggerRef = useRef(null);
  const contextValue = useMemo(() => ({ isOpen, setIsOpen, uniqueId, triggerRef }), [isOpen, uniqueId]);
  return (
    <DialogContext.Provider value={contextValue}>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </DialogContext.Provider>
  );
}

export function Dialog({ children, transition }) {
  return (
    <DialogProvider transition={transition}>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </DialogProvider>
  );
}

export function DialogTrigger({ children, className, style, triggerRef }) {
  const { setIsOpen, isOpen, uniqueId } = useDialog();
  const handleClick = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]);
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setIsOpen(!isOpen); }
  }, [isOpen, setIsOpen]);
  return (
    <motion.div ref={triggerRef} layoutId={`dialog-${uniqueId}`}
      className={cn('relative cursor-pointer', className)}
      onClick={handleClick} onKeyDown={handleKeyDown} style={style}
      role='button' aria-haspopup='dialog' aria-expanded={isOpen}
      aria-controls={`dialog-content-${uniqueId}`}>
      {children}
    </motion.div>
  );
}

export function DialogContent({ children, className, style }) {
  const { setIsOpen, isOpen, uniqueId, triggerRef } = useDialog();
  const containerRef = useRef(null);
  const [firstEl, setFirstEl] = useState(null);
  const [lastEl, setLastEl] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') { setIsOpen(false); }
      if (e.key === 'Tab') {
        if (!firstEl || !lastEl) return;
        if (e.shiftKey) { if (document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); } }
        else { if (document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); } }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setIsOpen, firstEl, lastEl]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
      const els = containerRef.current?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (els && els.length > 0) { setFirstEl(els[0]); setLastEl(els[els.length - 1]); els[0].focus(); }
      if (containerRef.current) containerRef.current.scrollTop = 0;
    } else {
      document.body.classList.remove('overflow-hidden');
      triggerRef.current?.focus();
    }
  }, [isOpen, triggerRef]);

  return (
    <motion.div ref={containerRef} layoutId={`dialog-${uniqueId}`}
      className={cn('overflow-hidden', className)} style={style}
      role='dialog' aria-modal='true'
      aria-labelledby={`dialog-title-${uniqueId}`}
      aria-describedby={`dialog-description-${uniqueId}`}>
      {children}
    </motion.div>
  );
}

export function DialogContainer({ children, className }) {
  const { isOpen, setIsOpen, uniqueId } = useDialog();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); return () => setMounted(false); }, []);
  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence initial={false} mode='sync'>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            key={`backdrop-${uniqueId}`}
            className="fixed inset-0 h-full w-full bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <div className={cn('relative z-10 w-full max-w-2xl my-auto', className)}>
            {children}
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export function DialogTitle({ children, className, style }) {
  const { uniqueId } = useDialog();
  return <motion.div layoutId={`dialog-title-container-${uniqueId}`} className={className} style={style} layout>{children}</motion.div>;
}

export function DialogSubtitle({ children, className, style }) {
  const { uniqueId } = useDialog();
  return <motion.div layoutId={`dialog-subtitle-container-${uniqueId}`} className={className} style={style}>{children}</motion.div>;
}

export function DialogDescription({ children, className, variants, disableLayoutAnimation }) {
  const { uniqueId } = useDialog();
  return (
    <motion.div key={`dialog-description-${uniqueId}`}
      layoutId={disableLayoutAnimation ? undefined : `dialog-description-content-${uniqueId}`}
      variants={variants} className={className}
      initial='initial' animate='animate' exit='exit'
      id={`dialog-description-${uniqueId}`}>
      {children}
    </motion.div>
  );
}

export function DialogImage({ src, alt, className, style }) {
  const { uniqueId } = useDialog();
  return <motion.img src={src} alt={alt} className={cn(className)} layoutId={`dialog-img-${uniqueId}`} style={style} />;
}

export function DialogClose({ children, className, variants }) {
  const { setIsOpen, uniqueId } = useDialog();
  const handleClose = useCallback((e) => {
    e?.stopPropagation?.();
    setIsOpen(false);
  }, [setIsOpen]);
  return (
    <motion.button onClick={handleClose} type='button' aria-label='Close dialog'
      key={`dialog-close-${uniqueId}`}
      className={cn('absolute right-6 top-6 z-20', className)}
      initial='initial' animate='animate' exit='exit' variants={variants}>
      {children || <XIcon size={24} />}
    </motion.button>
  );
}

const Component = forwardRef(({ items }, ref) => {
  return (
    <div ref={ref} className='flex gap-4'>
      {items.map((item) => (
        <React.Fragment key={item.id}>
          <Dialog transition={{ type: 'spring', bounce: 0.05, duration: 0.5 }}>
            <DialogTrigger style={{ borderRadius: '12px' }}
              className='flex w-full flex-col overflow-hidden border dark:bg-black bg-gray-300 hover:bg-gray-200 dark:hover:bg-gray-950'>
              <DialogImage src={item.url.src} alt='' className='h-64 w-full object-cover' />
              <div className='flex flex-grow flex-row items-end justify-between p-3'>
                <DialogTitle className='text-zinc-950 text-xl dark:text-zinc-50'>{item.title}</DialogTitle>
                <button className='absolute bottom-2 right-2 p-2 dark:bg-gray-900 bg-gray-400 hover:bg-gray-500 rounded-full dark:hover:bg-gray-800'>
                  <Plus className='w-6 h-6' />
                </button>
              </div>
            </DialogTrigger>
            <DialogContainer className='pt-20'>
              <DialogContent style={{ borderRadius: '24px' }}
                className='relative flex h-full mx-auto flex-col overflow-y-auto border dark:bg-black bg-gray-300 lg:w-[900px] w-[80%]'>
                <DialogImage src={item.url.src} alt='' className='h-full object-contain w-[60%] mx-auto' />
                <div className='p-6'>
                  <DialogTitle className='text-5xl text-zinc-950 dark:text-zinc-50'>{item.title}</DialogTitle>
                  <DialogDescription disableLayoutAnimation
                    variants={{ initial: { opacity: 0, scale: 0.8, y: -40 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.8, y: -50 } }}>
                    <p className='mt-2 text-zinc-500 dark:text-zinc-500'>{item.description}</p>
                  </DialogDescription>
                </div>
                <DialogClose className='text-zinc-50 dark:bg-gray-900 bg-gray-400 p-4 hover:bg-gray-500 rounded-full dark:hover:bg-gray-800' />
              </DialogContent>
            </DialogContainer>
          </Dialog>
        </React.Fragment>
      ))}
    </div>
  );
});

Component.displayName = 'Component';
export default Component;
