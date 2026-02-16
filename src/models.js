class Hadith {
  constructor(data) {
    this.attribution = data.attribution || '';
    this.authenticity = data.authenticity || '';
    this.category = data.category || '';
    this.context = data.context || '';
    this.explanation = data.explanation || '';
    this.hadith = data.hadith || '';
    this.narratedBy = data.narratedBy || '';
    this.book = data.book || '';
    this.hadithId = data.hadithId || '';
    this.number = data.number || '';
    this.translation = data.translation || '';
  }

  toJSON() {
    return {
      attribution: this.attribution,
      authenticity: this.authenticity,
      category: this.category,
      context: this.context,
      explanation: this.explanation,
      hadith: this.hadith,
      narratedBy: this.narratedBy,
      book: this.book,
      hadithId: this.hadithId,
      number: this.number,
      translation: this.translation,
    };
  }
}

class APIResponse {
  constructor(data) {
    this.status = data.status || 'error';
    this.message = data.message || '';
    this.data = data.data || [];
    this.timestamp = data.timestamp ? new Date(data.timestamp) : new Date();
    this.code = data.code || 200;
  }

  isSuccess() {
    return this.status === 'success';
  }

  isError() {
    return this.status === 'error';
  }
}

module.exports = {
  Hadith,
  APIResponse,
};
