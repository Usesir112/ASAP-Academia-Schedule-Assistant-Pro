// src/store/curriculumStore.js
import { defineStore } from "pinia";
import axios from "axios";

export const useCurriculumStore = defineStore("curriculum", {
  state: () => ({
    curricula: [],
    isLoading: false,
    error: null,
    searchTerm: "",
  }),
  getters: {
    filteredCurricula() {
      if (!this.searchTerm) return this.curricula;

      const searchLower = this.searchTerm.toLowerCase();

      return this.curricula.filter((curriculum) => {
        const id = curriculum.id.toString();
        const code = curriculum.code.toLowerCase();
        const name = curriculum.name.toLowerCase();
        const calYear = curriculum.calYear.toString();

        return (
          id.includes(searchLower) ||
          code.includes(searchLower) ||
          name.includes(searchLower) ||
          calYear.includes(searchLower)
        );
      });
    },
  },
  actions: {
    async fetchCurricula() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get("/api/curriculum");
        this.curricula = response.data;
      } catch (error) {
        console.error("Error fetching curriculum data:", error);
        this.error = "Error fetching curriculum data.";
      } finally {
        this.isLoading = false;
      }
    },

    setSearchTerm(term) {
      this.searchTerm = term;
    },

    async getCurriculumById(id) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get(`/api/curriculum/${id}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching curriculum data:", error);
        this.error = "Error fetching curriculum data.";
        return null;
      } finally {
        this.isLoading = false;
      }
    },

    async createCurriculum(newCurriculum) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.post("/api/curriculum", newCurriculum);
        this.curricula.push(response.data);
      } catch (error) {
        console.log( typeof newCurriculum);
        console.error("Error creating curriculum:", error);
        this.error = "Error creating curriculum.";
      } finally {
        this.isLoading = false;
      }
    },

    async updateCurriculum(id, updatedCurriculum) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.put(
          `/api/curriculum/${id}`,
          updatedCurriculum
        );
        const index = this.curricula.findIndex(
          (curriculum) => curriculum.id === id
        );
        if (index !== -1) {
          this.curricula[index] = response.data;
        }
      } catch (error) {
        console.error("Error updating curriculum:", error);
        this.error = "Error updating curriculum.";
      } finally {
        this.isLoading = false;
      }
    },

    async deleteCurriculum(id) {
      this.isLoading = true;
      this.error = null;
      try {
        await axios.delete(`/api/curriculum/${id}`);
        this.curricula = this.curricula.filter(
          (curriculum) => curriculum.id !== id
        );
      } catch (error) {
        console.error("Error deleting curriculum:", error);
        this.error = "Error deleting curriculum.";
      } finally {
        this.isLoading = false;
      }
    },
  },
});
