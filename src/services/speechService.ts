export const SpeechService = {
  isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  },

  speak(text: string, lang: 'en' | 'hi' = 'en', onEnd?: () => void): void {
    if (!this.isSupported()) return;

    this.stop();

    const cleanText = text
      .replace(/₹/g, 'Rupees ')
      .replace(/\*/g, '')
      .replace(/#/g, '')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Try finding natural voice
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find((v) =>
      lang === 'hi'
        ? v.lang.startsWith('hi')
        : v.lang.startsWith('en-IN') || v.lang.startsWith('en-GB') || v.lang.startsWith('en')
    );

    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  },

  stop(): void {
    if (this.isSupported()) {
      window.speechSynthesis.cancel();
    }
  }
};
