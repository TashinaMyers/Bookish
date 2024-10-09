// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    return decode(this.getToken());
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);  // Ensure token exists and is not expired
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);  // Decode token
      return decoded.exp < Date.now() / 1000;  // Check if token has expired
    } catch (err) {
      return false;  // Return false if any error occurs (e.g., invalid token)
    }
  }

  // Retrieve token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Save user token to localStorage when logged in
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');  // Redirect user to homepage after login
  }

  // Clear user token and log out
  logout() {
    localStorage.removeItem('id_token');  // Remove token from localStorage
    window.location.assign('/');  // Refresh and reset application state
  }
}

export default new AuthService();
