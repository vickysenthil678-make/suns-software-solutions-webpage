export default function TechBand() {
  const techs = ['Web Design', 'Custom Apps', 'E-commerce', 'Mobile', 'SEO', 'Support', 'PHP', 'Laravel', 'React', 'UI / UX', 'MySQL'];

  return (
    <div className="band" aria-hidden="true">
      <div className="marquee">
        <div className="marquee-group">
          {techs.map((tech, i) => (
            <span key={i}>{tech}</span>
          ))}
        </div>
        <div className="marquee-group">
          {techs.map((tech, i) => (
            <span key={`dup-${i}`}>{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
