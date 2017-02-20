# Chinese POD to ANKI Export

This is a plugin which can be used to export vocabulary from Chinese pod to ANKI. Chinese pod already provides this service, but their export doesn't include the associated audio files, and this one does.

## Installing the plugin
The plugin can be installed as a bookmarklet. This basically is a bookmark in your browser which executes JavaScript.

Create a new bookmark in your browser. The title can be whatever you want, and the URL should be the contents of this file: [export.scriplet.js](./export.scriplet.js)

## Using the plugin
The plugin will export all vocabulary items which are checked on the vocabulary section of Chinese pod. If no items are checked, the program will prompt you to select a range of items.

![Selecting a range](https://lh3.googleusercontent.com/sY0aSMbZJDw_hFMbHZ1Uq8sfujUXTVrQbbG6TeCA1qYB0lOlGpCyPWYv_9VGU0zCQdrun5OsFePjJ6QK27vUUJiDxpdN56ooU-SX-iNKSyk8VhQedx8a4ZV2iybC612Wo_9HmxZUyNhlm022pWEKehKaYMgex_nf8iMc0zkd-noMSAcp_ljzkIaQGDHTTn5vXMp1-2F5sDQkaJJlAWQ-9nV-BjfRGZ4m3L82Y3D24LtNqFynQaGTxdy5HT2pP2XtPfj0D-H4_vsaZgNwVxuwNCWbq2rvAMCGcOzho7aUpsxRrVN1K8erG7sR3X3St2RcHoeEsqdvDgKpLlZnnzaQWN9qzzsg7vOVqQmNhmTZDHA2engjqUCjk5fsr2h3Z9jtpo3isFuq11ePo7-Vmx7_Me7b3V25UFmJW43mPp-p1flz3XdMtVtidlI8Vh_a9h2DgWzpZPpoS2Wh2s7FqCaf7qgeTGevAS50aOVF6yABo35bC_mFpK66awYr5dbapOOfbvMWN_J7-DfBv4xOIfC7g-wmyuFv0i_x5Jnnmxa9IzgzGnV-9hP4OZG6G7LJsUdnMELnoPTv_xYkWVVjGD7ibGhsSR6SMUWGBJIu9s2Qsqk7Z1OulBDM=w800-h640-no)

If items are checked, running the program will export the vocabulary items. First, the program will prompt you if you want to download audio, and a file containing the contents of the export.

When the export starts a dialog will pop up which shows the progress of the export. It will also print a message when it's done.

![Showing progress](https://lh3.googleusercontent.com/vS4OvUusKVcm_1Gy_LeQ1KtC8E_ceAXFgrC3CeRfGqmjhvu87Q5_SdEraN-Fdm6MRtoGmMGHF6bqaz1nvykS9eLBkL0sr1DjRuYav1tH5KitNcFWbDwXEH6gp6JVqMHDhG2jDZmOtWYJVbK7Jw9L9AOlnvMi438NQYTNa_BnaKBOGXXkqD9GOLQ7tiVJMxj2Vc4eVvN9-mWVd4-bd9oz1xSsqjhTlb5jggPHHn-jl-TdzTra4jDqNPEbJtl34hU6SgGXzKU1SZzV5kJJS0ibgm6WWIEjwZBV80z0jRrXGea1Cz7T1BTMtUsUk4JcqBh5dwFsUnmKmfNJVmQe0t6gMw0qhaZDs0YRcoH7kgkkTbZO44eVwejilLJsBD8WW0xT-Azn5-mv0a2PbBESxgl_CuPwvkfcOMnyxJrEQ7v3zLoIyb5AUQSz4hpBv9YeMAm5z5zAZsYsLtZgiAztUZaRaWtVziypFvF1YRrYrbXT2uMMUy2dDES-FncLbawdkXcai5ctwn62muM1Rrtuj0DjwLWckHiT4v-x0X3e2Da4bkmcFIyEIpjTcftZBaq_ZPYYZRzyNAb8_mDgUc4V2p5-8rwcH-m8woszARxOqFoTklnFhALuJ2Hp=w1019-h870-no)

After the export is complete, if you chose to download audio, the downloaded audio files will need to be copied to your ANKI home directory. The audio files should be downloaded into your local Downloads folder. The ANKI target directory is \<ANKI HOME\>/\<USER\>/collection.media.

The program creates Chinese to English flashcards as well as English to Chinese flashcards (for character writing practice). To import to ANKI, save the contents of the export to a text file. The contents can be copied by clicking the buttons at the bottom of the dialog.

![Copying contents](https://lh3.googleusercontent.com/SU_1PIxDkoGZ7mIqdxJ_xeaBY4RnMNlbBGIVFjWx2MigRWe-C7yE47dtUFETtGPMmNlYwoQduzeeldcGSK20zeoajHTOmTjjjC_mp_isTXzdtgK4_eLTOHucXrLwjiAIIrxZ64Z043N-EVbq8uOLP88KrlyKXw28W7mS8T856NCar4xQP7gol4DZEpViP9CF0G2e2wETMGyV8zz4wEn4h5bDyLPCsSM7pWG1qHzTozyhF1B3Sifbn2LuITL2KNIkvU8cBfDpUKFw4XO1o6uWNmEkKeibC7LTFA74ksoHAyq820YxFw6GHoroGl7Gsn7_GEqXVkC5RutuA5lOuoujHGnkIS2dm4oWGXcywP15jz-hMQdAFgcYE-6n1EhEloxk-LRL3Lmc2R3EM51wIv2xVaEkrQIeNMQ8T1ZYenc4DyrQ1bhufHB0fiCFjuvOyI2JdyFj5XVyVDYqXEmScB3Kdeb-bDVApO-TgHrndFfISHbCyFTHzOU-a6WoNkeJ3Iz3ITnYpVF0V9AGSB2gbhtAoJxzFtddCUHxxPt0TEKu0xsAwe9RlngGGs-UGDvWG2jWRcgHz4_yDz-sVBmReZJ2dhaI5S-PtfPRh1RcCHPDq4zOnvmq5b-T=w1019-h870-no)

Save the exported vocabulary in a text file, then use ANKI's import feature.

![Copying contents](https://lh3.googleusercontent.com/LIC63orBITB8xN7z-gq4q56pdlvNbkVzVEc9Mkr0WR1mKPeyGZhybxWjZykBILCZs75QI4joWosGhUy5qei_m4oBUPDtrlfSOz-Bule4lTtn0AyqvXuAKubcmeUelJ9WRZGXHYBSYT9nTFBZSOjNeaTDCtVXE_GMnTc03orrjXAyLRIgghS2CZGJXWj2ani746A9Ur6MvdD1PG20paR33pjnzgioy6lY-CzAyZAn4DKKJKc5zOItx-K3yHZCRq1GHSa6DLvFcpxTWDUELj3yHaOcA0pV6ibAlwS31Cpo9mrc9XHqY3gbMPtrlAzY_KaWme6hfWcX5lRO33VXIYserUSSxnz7k-g_nC1oOC3br4viopkIYnnn2URiyaP-gsy8yDCf89z1nr0d8AWV2ZuS95KHql7HEsFzcQlbGm5ttMS7SiOEsMW6Aj7abwoCqca092XFFOc0omn8guUaPqNzrRSvxquO0m5EA6iCaI3JnelwplA3pY2kRNlyWnRevjFEzA-xPSIyCISGBFzSi_qUmVf26tCS7z4agVz4mKt6f2EwpANdqvri4BeWzBjYuQJ0k2ZBa15ZLLUrbbTQHD-yAa2KkacacXv3qdgkOD2TRudGRZW31REN=w977-h647-no)
