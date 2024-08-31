import { convertFromRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';

// JSON形式のコンテンツをHTMLに変換する関数
export const convertDraftContentToHTML = (rawContent: string) => {
  try {
    const contentState = convertFromRaw(JSON.parse(rawContent));
    return convertToHTML(contentState);
  } catch (error) {
    console.error('Failed to convert draft content to HTML:', error);
    return '';
  }
};
