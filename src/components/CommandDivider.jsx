import { motion } from 'framer-motion';

export default function CommandDivider() {
  return (
    <div className="w-full flex justify-center items-center gap-3 py-2 font-mono text-xs text-dim">
      <motion.span
        className="text-signal"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        {'$'}
      </motion.span>
      <motion.div
        className="h-px bg-line w-40 md:w-64 origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />
      <motion.span
        className="w-[7px] h-[13px] bg-signal inline-block"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 1, 0] }}
        viewport={{ once: true }}
        transition={{ duration: 1, repeat: 2, delay: 0.9 }}
      />
    </div>
  );
}
