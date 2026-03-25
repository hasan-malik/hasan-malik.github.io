export default function SignatureWatermark() {
  return (
    <img
      src="/signature.jpg"
      alt=""
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
      style={{ opacity: 0.06, filter: 'invert(1)' }}
    />
  )
}
