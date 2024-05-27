type SVGType = {
  icon: string;
  className?: string;
};

export default function SVG({ icon, className }: SVGType) {
  return (
    <svg className={className}>
      <use xlinkHref={`/img/sprite.svg#${icon}`}></use>
    </svg>
  );
}
