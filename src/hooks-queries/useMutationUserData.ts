import { useMutation, useQueryClient } from "@tanstack/react-query";

// Fake request function that waits for 2 seconds before returning
const postUserDataFake = async () => {
  // Simulates a delay of 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Simulates the response of the request
  return { success: true, message: "Data sent successfully!" };
};

export default function useMutationUserData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postUserDataFake(),
    mutationKey: ["mutationUserData"],
    onError: () => {},
    onSuccess: (data, variables) => {
      // Example: Update user data in cache upon successful mutation
      const { username } = variables;
      queryClient.setQueryData(["userData", username], (old) => {
        return {
          ...old,
          avatar_url:
            "https://people.com/thmb/SL7_3mF5irtEm4Kz8f63FWDrmPA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(999x0:1001x2)/dog-dating-1-a1a34ab3445740fcadf8699850c8333b.jpg",
        };
      });
    },
  });
}
