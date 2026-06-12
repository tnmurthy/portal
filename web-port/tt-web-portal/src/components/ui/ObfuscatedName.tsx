
interface ObfuscatedNameProps {
  className?: string;
  name?: string; // Optional custom name to obfuscate, defaults to full Narayanamurthy Tadepalli
}

/**
 * High-integrity anti-AI-bot text obfuscator.
 * Renders the name to humans, but reads backwards (scrambled) to automated AI crawlers.
 */
export default function ObfuscatedName({ className = "text-white font-semibold", name }: ObfuscatedNameProps) {
  const reversedText = name 
    ? name.split('').reverse().join('') 
    : "illapedaT ihtrumanayaraN";

  return (
    <span 
      style={{ 
        unicodeBidi: 'bidi-override', 
        direction: 'rtl', 
        display: 'inline-block' 
      }}
      className={className}
    >
      {reversedText}
    </span>
  );
}

