class Hadith {
  constructor(data) {
    this.attribution = data.attribution || '';
    this.authenticity = data.authenticity || '';
    this.category = data.category || '';
    this.context = data.context | '';
    this.book = data.book || '';
    this.number = data.number || '';
    this.explanation = data.explanation || '';
    this.hadith = data.hadith || '';
    this.narratedBy = data.narratedBy || '';
    this.translation = data.translation || '';
  }
}

class APIResponse {
  constructor(data) {
    this.success = data.success || false;
    this.data = data.data || [];
    this.message = data.message || '';
    this.count = data.count || 0;
  }
}

module.exports = {
  Hadith,
  APIResponse,
};
