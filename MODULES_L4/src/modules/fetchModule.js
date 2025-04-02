async function fetchData(url) {
    const result = {
      data: null,
      isLoading: true,
      error: null
    };
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      result.data = await response.json();
    } catch (error) {
      result.error = error.message;
    } finally {
      result.isLoading = false;
    }
  
    return result;
  }
  
  module.exports = { fetchData };