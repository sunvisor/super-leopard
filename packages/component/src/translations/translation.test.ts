/**
 * Test for Translation
 *
 * Created by sunvisor on 2025/03/08.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import translation, { addLanguage, mergeLanguage, setLanguage } from "./translation";
import { ja } from './languages/ja';
import { en } from './languages/en';

describe('Tests for translation', () => {

  it('should return ja when currentLanguage is ja', () => {
    setLanguage('ja');
    expect(translation()).toEqual(ja);
  });

  it('should return en when currentLanguage is en', () => {
    setLanguage('en');
    expect(translation()).toEqual(en);
  });

  it('should throw error when currentLanguage is unknown', () => {
    expect(() => setLanguage('unknown')).toThrowError('Unknown language: unknown');
  });

  describe("Tests for addLanguage", () => {

    it('should add new language', () => {
      // Arrange
      const lang = 'custom';
      const newTranslation = {
        ...ja,
        operation: {
          ...ja.operation,
          undo: "Undo"
        }
      };
      // Act
      addLanguage(lang, newTranslation);
      // Assert
      setLanguage(lang);
      expect(translation().operation.undo).toBe('Undo');
    });

    it('should throw error when language already exists', () => {
      // Arrange
      const lang = 'en';
      const newTranslation = {
        ...ja,
        operation: {
          ...ja.operation,
          undo: "Undo"
        }
      };
      // Act & Assert
      expect(() => addLanguage(lang, newTranslation)).toThrowError('Language already exists: en');
    });

  });

  describe("Tests for mergeLanguage", () => {

    it("should override value", () => {
      const updated = mergeLanguage("en", {
        operation: { undo: "元に戻す" },
      });

      expect(updated.operation.undo).toBe("元に戻す");
      expect(updated.operation.redo).toBe("Redo"); // should not change
    });

    it("should throw error when unknown language is specified", () => {
      expect(() => mergeLanguage("fr", { operation: { undo: "Annuler" } }))
        .toThrow("Unknown language: fr");
    });

    it("can update multiple sections at once", () => {
      const updated = mergeLanguage("en", {
        operation: { undo: "元に戻す", redo: "やり直し" },
        reportObject: { property: "プロパティ", layer: "レイヤー" },
      });

      expect(updated.operation.undo).toBe("元に戻す");
      expect(updated.operation.redo).toBe("やり直し");
      expect(updated.reportObject.property).toBe("プロパティ");
      expect(updated.reportObject.layer).toBe("レイヤー");

      // should not change
      expect(updated.operation.delete).toBe("Delete");
      expect(updated.reportObject.report).toBe("Report");
    });

  });

});
