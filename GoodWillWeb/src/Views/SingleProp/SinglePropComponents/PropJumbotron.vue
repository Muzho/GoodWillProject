<template>
  <div class="mainImageDiv">
    <v-jumbotron
      :gradient="gradient"
      dark
      class="jumbotron"
      height="350px"
      :src="tileImg"
    >
      <v-container fluid fill-height>
        <v-layout px-4 row wrap>
          <v-flex pt-5 xs12 text-xs-left>
            <v-btn outline color="primary" @click="showOtherImages">
              <v-icon left>collections</v-icon>
              View Other Photos
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
    <!-- show images dialog -->
    <v-dialog v-model="imagesDialog" max-width="800">
      <v-carousel>
        <v-carousel-item
          v-for="(propImage,i) in propImages"
          :key="i" lazy
          :src="propImage.PropertyImage"
          transition="fade"
          reverse-transition="fade"
        >
        </v-carousel-item>
      </v-carousel>
    </v-dialog>
  </div>
</template>

<script>
  import singlePropService from '@/Services/singleProperty/singleProperty'
  export default {
    props: {
      prop_id: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)',
        propImages: [],
        tileImg: '',
        imagesDialog: false
      }
    },
    mounted () {
      this.propertyImages()
    },
    created () {
      this.propertyImages()
    },
    methods: {
      async propertyImages () {
        const response = await singlePropService.propImages({
          propID: this.prop_id
        })

        if (response) {
          if (response.data.success === true) {
            this.tileImg = response.data.tileImg.propImage
            this.propImages = response.data.otherImages
          } else if (response.data.success === false) {
            console.log(response.data)
          }
        }
      },
      showOtherImages () {
        this.imagesDialog = true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  button {
    text-transform: capitalize;
  }
</style>
<style lang="stylus">
  #example-custom-transition
    .fade
      &-enter-active, &-leave-active, &-leave-to
        transition: .3s ease-out
        position: absolute
        top: 0
        left: 0

      &-enter, &-leave, &-leave-to
        opacity: 0
</style>
