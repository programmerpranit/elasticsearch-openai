import aposToLexForm from "apos-to-lex-form";
import { WordTokenizer, SentimentAnalyzer, PorterStemmer } from "natural";
import SpellCorrector from "spelling-corrector";

import { removeStopwords } from "stopword";

export const sentimentAnalysis = (review) => {
  console.log(review);
  const lexedReview = aposToLexForm(review);
  const casedReview = lexedReview.toLowerCase();
  const alphaOnlyReview = casedReview.replace(/[^a-zA-Z\s]+/g, "");
  const tokenizer = new WordTokenizer();
  const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);
  const spellCorrector = new SpellCorrector();
  tokenizedReview.forEach((word, index) => {
    tokenizedReview[index] = spellCorrector.correct(word);
  });
  const filteredReview = removeStopwords(tokenizedReview);
  const analyzer = new SentimentAnalyzer("English", PorterStemmer, "afinn");
  const analysis = analyzer.getSentiment(filteredReview);
  return analysis;
};
