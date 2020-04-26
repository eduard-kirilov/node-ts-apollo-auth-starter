export const isAuthenticated = (req: any) => {
  if (!req.isAuthenticated()) {
    throw new Error('User not authenticated');
  }
};
