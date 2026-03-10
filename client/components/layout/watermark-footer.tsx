export const WatermarkFooter = () => {
  return (
    <footer
      aria-hidden
      className="pointer-events-none flex flex-col items-center justify-end overflow-hidden pt-20 pb-2 select-none"
    >
      <span className="text-[clamp(3rem,15vw,14rem)] leading-none font-black tracking-wide text-foreground/[0.1] dark:text-foreground/[0.1]">
        wworks
      </span>
    </footer>
  )
}
