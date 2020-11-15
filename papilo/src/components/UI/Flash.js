import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'

const flash = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
}

const Flash = () => {
    const {alert: {message, type}} = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        let timer
        if(message) {
            timer = setTimeout(function() {
                dispatch({type: '', message: ''});
            }, 3000)
        }
        return () => {
            clearTimeout(timer)
        }
    }, [message, dispatch])

    return (
        <AnimatePresence exitBeforeEnter>
            {
                message && (
                    <motion.div className={`z-20 fixed top-0 right-0 text-white shadow-md py-2 px-4 mt-2 mx-2 text-lg font-bold ${type === 'Success' ? 'bg-green-600' : 'bg-red-600'}`}
                        variants={ flash }
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        {message}
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

export default Flash
