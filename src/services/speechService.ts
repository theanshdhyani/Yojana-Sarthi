export const SpeechService = {
  isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  },

  /** A voice for this BCP 47 tag (e.g. "ta-IN"), matched on the language part if no exact match. */
  findVoice(bcp47: string): SpeechSynthesisVoice | undefined {
    if (!this.isSupported()) return undefined;
    const voices = window.speechSynthesis.getVoices();
    const tag = bcp47.toLowerCase().replace('_', '-');
    const primary = tag.split('-')[0];
    return (
      voices.find((v) => v.lang.toLowerCase().replace('_', '-') === tag) ??
      voices.find((v) => v.lang.toLowerCase().startsWith(primary))
    );
  },

  /**
   * Reads text aloud in the given language. Returns false when the device has no voice for it,
   * so the caller can tell the user instead of a default English voice mangling Indic script.
   */
  speak(text: string, bcp47 = 'en-IN', onEnd?: () => void, rate = 0.95): boolean {
    if (!this.isSupported()) return false;

    this.stop();

    const cleanText = text.replace(/\*/g, '').replace(/#/g, '').trim();
    if (!cleanText) return false;

    const voice = this.findVoice(bcp47);
    // Voices load asynchronously on some browsers; English can still use the default voice.
    if (!voice && !bcp47.startsWith('en')) return false;

    const utterance = new SpeechSynthesisUtterance(bcp47.startsWith('en') ? cleanText.replace(/₹/g, 'Rupees ') : cleanText);
    utterance.lang = bcp47;
    utterance.rate = rate;
    utterance.pitch = 1.0;
    if (voice) utterance.voice = voice;

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
    return true;
  },

  stop(): void {
    if (this.isSupported()) {
      window.speechSynthesis.cancel();
    }
  }
};
