/**
 * LOVELY - GL Universe Project
 * Main entry point
 */

console.log('🌟 Welcome to LOVELY - GL Universe Edition!');

export const getWelcomeMessage = (): string => {
  return 'Hello from LOVELY! Welcome to GL Universe.';
};

export const initialize = (): void => {
  console.log(getWelcomeMessage());
};

// Run initialization
if (require.main === module) {
  initialize();
}
