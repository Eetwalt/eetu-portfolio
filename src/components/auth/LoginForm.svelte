<script lang="ts">
    import supabase from "../../lib/supabaseClient";

    let errorMessage = "";

    async function submitLogin(e: SubmitEvent) {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;

        let emailInput = form.email.value;
        let passwordInput = form.password.value;

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: emailInput,
                password: passwordInput,
            })

            if (!error) {
                errorMessage = "";
                console.log("successful");
                window.location.href = "/admin";
                
            } else {
                errorMessage = error;
            }
        } catch (error) {
            errorMessage = "Network error. Error logging in";
            console.error('Error submitting comment:', error);
            // Provide feedback to the user, e.g., show an error message.
        }
    }
</script>

<form class="space-y-4 md:space-y-6" on:submit={(e) => submitLogin(e)}>
    <div>
      <label
        for="email"
        class="block mb-2 text-sm font-medium text-gray-900"
        >Your email</label
      >
      <input
        type="email"
        name="email"
        id="email"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        placeholder="name@company.com"
        required
      />
    </div>
    <div>
      <label
        for="password"
        class="block mb-2 text-sm font-medium text-gray-900"
        >Password</label
      >
      <input
        type="password"
        name="password"
        id="password"
        placeholder="••••••••"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        required
      />
    </div>
    <div class="flex items-center justify-between">
      <div class="flex items-start">
        <div class="flex items-center h-5">
          <input
            id="remember"
            aria-describedby="remember"
            type="checkbox"
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
          />
        </div>
        <div class="ml-3 text-sm">
          <label for="remember" class="text-gray-600"
            >Remember me</label
          >
        </div>
      </div>
      <a
        href="#"
        class="text-sm font-medium text-primary-600 hover:underline"
        >Forgot password?</a
      >
    </div>
    <button
      type="submit"
      class="w-full text-white bg-gray-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >Sign in</button
    >
    {#if errorMessage}
        <p>{errorMessage}</p>
    {/if}
  </form>