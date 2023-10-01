<script lang="ts">
    let responseMessage: string;

    async function submit(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const response = await fetch("https://www.eeturantanen.dev/api/send/sendMail", {
        method: "POST",
        body: formData,
    });
    const data: any = await response.json();
    console.log(data);
    responseMessage = data.message;
    }
</script>

<form on:submit={submit}>
    <div class="row">
        <div class="col col-lg-6 col-sm-12 relative z-0 w-full u-mb-2 group">
            <input type="text" name="first_name" id="first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-900 appearance-none dark:text-black dark:border-gray-800 dark:focus:border-purple-800 focus:outline-none focus:ring-0 focus:border-purple-800 peer" placeholder=" " required />
            <label for="first_name" class="absolute text-sm text-gray-700 dark:text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-5 peer-focus:text-purple-800 peer-focus:dark:text-purple-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                First name
            </label>
        </div>
        <div class="col col-lg-6 col-sm-12 relative z-0 w-full u-mb-2 group">
            <input type="text" name="last_name" id="last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-900 appearance-none dark:text-black dark:border-gray-800 dark:focus:border-purple-800 focus:outline-none focus:ring-0 focus:border-purple-800 peer" placeholder=" " required />
            <label for="last_name" class="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-5 peer-focus:text-purple-800 peer-focus:dark:text-purple-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Last name
            </label>
        </div>
        <div class="col col-lg-6 col-sm-12 relative z-0 w-full u-mb-2 group">
            <input type="email" name="email" id="email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-900 appearance-none dark:text-black dark:border-gray-800 dark:focus:border-purple-800 focus:outline-none focus:ring-0 focus:border-purple-800 peer" placeholder=" " required />
            <label for="email" class="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-5 peer-focus:text-purple-800 peer-focus:dark:text-purple-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Email address
            </label>
        </div>
        <div class="col col-lg-6 col-sm-12 relative z-0 w-full u-mb-2 group">
            <input type="tel" name="phone" id="phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-900 appearance-none dark:text-black dark:border-gray-800 dark:focus:border-purple-800 focus:outline-none focus:ring-0 focus:border-purple-800 peer" placeholder=" " required />
            <label for="phone" class="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-5 peer-focus:text-purple-800 peer-focus:dark:text-purple-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Phone number (123-456-7890)
            </label>
        </div>
        <div class="col col-lg-12 relative z-0 w-full u-mb-2 group col-span-2">
            <input type="text" name="company" id="company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-900 appearance-none dark:text-black dark:border-gray-800 dark:focus:border-purple-800 focus:outline-none focus:ring-0 focus:border-purple-800 peer" placeholder=" " required />
            <label for="company" class="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-5 peer-focus:text-purple-800 peer-focus:dark:text-purple-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Company (Ex. Google)
            </label>
        </div>
        <div class="col col-lg-12 relative z-0 w-full u-mb-2 group col-span-2">
            <textarea name="message" id="message" rows="3" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-900 appearance-none dark:text-black dark:border-gray-800 dark:focus:border-purple-800 focus:outline-none focus:ring-0 focus:border-purple-800 peer" placeholder=" " required />
            <label for="message" class="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-5 peer-focus:text-purple-800 peer-focus:dark:text-purple-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Message
            </label>
        </div>
    </div>
    <button type="submit" class="btn cc-light w-button w-full">Submit form</button>
    {#if responseMessage}
        <p>{responseMessage}</p>
    {/if}
</form>