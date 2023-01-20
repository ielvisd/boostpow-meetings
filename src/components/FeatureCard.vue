<script setup>
import { ref } from 'vue'
import RadialProgressBar from 'vue3-radial-progress'
import VueNumberInput from '@chenfengyuan/vue-number-input'
import { getAuth, signInAnonymously, signOut } from 'firebase/auth'
import { collection, doc, getDocs, getFirestore, increment, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
</script>

<template>
    <!-- Feature Container -->
    <div
        class="featureBg flex flex-col md:flex-row w-full md:w-sm items-center justify-center text-center rounded-xl mt-4 text-white p-2 mx-2">
        <!-- Text Container -->
        <div class="flex flex-col items-center justify-center text-center text-white">
            <h2
                class="text-lg md:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {{ title }} <span class="text-white">{{ icon }}</span>
            </h2>
            <p>{{ description }}</p>

            <div v-if="completedSteps < totalSteps" class="flex flex-row items-center justify-center">
                <vue-number-input v-model="donationValue" :step="0.01" :min="0.01" class="mt-2 mr-2 text-black"
                    placeholder="0.00 BSV" size="small" inline controls />
                <button
                    class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 mt-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    @click="handleSupport(donationValue)">
                    Support
                </button>
            </div>
            <span v-if="completedSteps >= totalSteps" class="font-bold mt-2">Funded ✅ 🤝</span>
            <div id="relayx-button" class="ml-2 mt-2" :class="`relayx-${paymailUsername}`" />
        </div>
        <p v-if="stepsWithPayment === null">
            Loading Contributions
        </p>
        <radial-progress-bar v-else class="mx-2" :diameter="diameter" :total-steps="totalSteps"
            :completed-steps="stepsWithPayment" :animate-speed="animateSpeed" :stroke-width="strokeWidth"
            :inner-stroke-width="innerStrokeWidth" :stroke-linecap="strokeLinecap" :start-color="startColor"
            :stop-color="stopColor" :inner-stroke-color="innerStrokeColor" :timing-func="timingFunc"
            :is-clockwise="isClockwise">
            <!-- Your inner content here -->
            <div class="text-purple-300 flex flex-col">
                <span>{{ completedSteps }} / {{ totalSteps }} BSV</span>
            </div>
        </radial-progress-bar>
    </div>
    <disclaimer-dialogue ref="disclaimer" />

    <!-- Feature Container -->
</template>

<script>
// import { useToast } from 'vue-toastification'
const donationValue = ref(null)

// const toast = useToast()

export default {
    props: {
        completedSteps: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        walletPaymail: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        totalSteps: {
            type: Number,
            required: true,
        },
        diameter: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            stepsWithPayment: null,
            animateSpeed: 1000,
            strokeWidth: 10,
            innerStrokeWidth: 10,
            startColor: '#C4B5FD',
            stopColor: '#AF9CFC',
            innerStrokeColor: 'white',
            timingFunc: 'linear',
            isClockwise: true,
        }
    },
    computed: {
        paymailUsername() {
            return this.walletPaymail.substr(0, this.walletPaymail.indexOf('@'))
        },
    },
    watch: {
        // whenever question changes, this function will run
        completedSteps(newCompletedSteps, oldCompletedSteps) {
            this.stepsWithPayment = newCompletedSteps
        },
    },
    created() {
        this.stepsWithPayment = this.newCompletedSteps
    },
    methods: {
        async handlePayment(walletPaymail, payment) {
            // Add to contributors list
            const auth = getAuth()

            signInAnonymously(auth)
                .catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                    alert(`There was an error recording your contribution. Please reach out to us in our Discord for support and write down this txid for reference: ${payment.txid}.`)
                    // toast.failure(`There was an error recording your contribution. Please reach out to us in our Discord for support and write down this txid for reference: ${payment.txid}.`)
                })

            try {
                const db = getFirestore()

                const createdAt = new Date()

                await setDoc(doc(db, this.walletPaymail, payment.paymail), {
                    paymail: payment.paymail,
                    amount: increment(payment.amount),
                    currency: payment.currency,
                    txid: payment.txid,
                    createdAt: serverTimestamp(),
                }, { merge: true })
                setTimeout(async () => {
                    this.$emit('new-contributor', ({ walletPaymail: this.walletPaymail, payment }))
                }, 2000)
            }
            catch (error) {
                const errorCode = error.code
                const errorMessage = error.message
                alert(`There was an error recording your contribution. Please reach out to us in our Discord for support and write down this txid for reference: ${payment.txid}.`)
                // toast.failure(`There was an error recording your contribution. Please reach out to us in our Discord for support and write down this txid for reference: ${payment.txid}.`)
            }
            // Update the Goal
            this.stepsWithPayment += payment.amount

            // Toast Notification?
        },
        async showDisclaimer() {
            const ok = await this.$refs.disclaimer.show({
                title: 'Disclaimer:',
                message: 'Are you sure you want to redeem this pre-order? It cannot be undone. Send preorder to: metagop@relayx.io after redeeming.',
                isDisclaimer: true,
            })
        },
        handleSupport(value) {

            // this.showDisclaimer()

            const div = document.querySelector(`.relayx-${this.paymailUsername}`)

            relayone.render(div, {
                to: this.walletPaymail,
                amount: value,
                currency: 'BSV',
                onPayment: (payment) => { this.handlePayment(this.walletPaymail, payment) },
            })
        },
    },
}
</script>

<style scoped>
.featureBg {
    background-color: rgba(55, 65, 81, 0.5);
}

.vue-number-input+.vue-number-input {
    margin-left: 1rem;
}

.vue-number-input__input {
    color: red
}
</style>
