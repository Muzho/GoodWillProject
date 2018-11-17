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
            <v-btn outline color="primary" @click="PickFiles">
              <v-icon left>add_to_photos</v-icon>
              Add More Images
            </v-btn>
            <input type="file"
            style="display: none"
            ref="files" id="files"
            accept="image/*"
            v-on:change="handleMultiFileUploads" multiple>
          </v-flex>
          <v-flex pt-5 xs12 text-xs-right>
            <v-btn depressed @click="PickFile">
              <v-icon left>insert_photo</v-icon>
              Change Tile Image
            </v-btn>
            <input type="file"
            style="display: none"
            ref="image"
            accept="image/*"
            @change="onFilePicked">
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
    <!-- Delete image dialog assurance -->
    <v-dialog persistent v-model="removeImageDialog" max-width="300">
      <v-card>
        <v-card-text class="text-color-orange"> Are you sure you want to remove the image </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.native="removeImageDialog = false">
            Cancel
          </v-btn>
          <v-btn flat @click.native="removeImage">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Change tile image dialog assurance -->
    <v-dialog persistent v-model="changeTileImageDialog" max-width="300">
      <v-card>
        <v-card-text class="text-color-orange"> Are you sure you want to change the tile image </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.native="removeChangeTileImgDialog">
            Cancel
          </v-btn>
          <v-btn flat @click.native="changeTileImage">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- show images dialog -->
    <v-dialog v-model="imagesDialog" max-width="600">
      <v-carousel>
        <v-carousel-item
          v-for="(propImage,i) in propImages"
          :key="i" lazy
          :src="propImage.PropertyImage"
          transition="fade"
          reverse-transition="fade"
        >
          <v-btn depressed @click="removePropertyImage(propImage.PropertyImage_Id)">
            <v-icon left>delete</v-icon>
            Remove Image
          </v-btn>
        </v-carousel-item>
      </v-carousel>
    </v-dialog>
  </div>
</template>

<script>
  import singlePropService from '@/Services/singleProp'
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
        imagesDialog: false,
        width: 600,
        height: 400,
        removeImageDialog: false,
        selectedImage: null,
        newTileImgName: null,
        newTileImgFile: null,
        newTileImgUrl: null,
        changeTileImageDialog: false,
        otherPropertyImages: [],
        otherPropertyImgs: []
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
      },
      removePropertyImage (propImage) {
        this.selectedImage = propImage
        this.removeImageDialog = true
      },
      async removeImage () {
        try {
          const response = await singlePropService.removeImage({
            propID: this.prop_id,
            imageID: this.selectedImage
          })

          if (response) {
            console.log(response.data)
            if (response.data.success === true) {
              this.propImages = response.data.remainingImages
              this.removeImageDialog = false
            } else if (response.data.success === false) {
              console.log(response.data)
            }
          }
        } catch (error) {
          console.log(error)
        }
      },
      PickFile () {
        this.$refs.image.click()
      },
      PickFiles () {
        this.$refs.files.click()
      },
      onFilePicked (e) {
        const files = e.target.files
        if (files[0] !== undefined) {
          this.newTileImgName = files[0].name
          // console.log(files[0].name)
          if (this.newTileImgName.lastIndexOf('.') <= 0) {
            return
          }
          this.newTileImgFile = files[0] // this is the image file
          const fr = new FileReader()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.newTileImgUrl = fr.result
          })
          // console.log('Image selected: ' + this.newTileImgFile)
          this.showChangeTileImgDialog()
        } else {
          this.newTileImgName = null
          this.newTileImgUrl = null
          this.newTileImgFile = null
        }
      },
      handleMultiFileUploads () {
        let uploadedFiles = this.$refs.files.files
        for (var i = 0; i < uploadedFiles.length; i++) {
          this.otherPropertyImages.push(uploadedFiles[i])
        }
        this.addPropertyImages(this.otherPropertyImages)
      },
      showChangeTileImgDialog () {
        this.changeTileImageDialog = true
      },
      removeChangeTileImgDialog () {
        this.newTileImgName = null
        this.newTileImgUrl = null
        this.newTileImgFile = null
        this.changeTileImageDialog = false
      },
      async changeTileImage () {
        try {
          const formDataPropImg = new FormData()
          formDataPropImg.append('propImage', this.newTileImgFile)
          const imageUploadResponse = await singlePropService.singleImageUpload(formDataPropImg)
          if (imageUploadResponse) {
            const response = await singlePropService.changeTileImage({
              tileImage: imageUploadResponse.data.fileUrl,
              propID: this.prop_id
            })

            if (response) {
              if (response.data.success === true) {
                this.tileImg = response.data.tileImg.propImage
                this.changeTileImageDialog = false
              } else if (response.data.success === false) {
                console.log(response.data.error)
              }
            }
          }
        } catch (error) {
          console.log('Error changing tile image: ' + error)
        }
      },
      async addPropertyImages (otherImages) {
        try {
          const formDataPropFiles = new FormData()
          for (let i = 0; i < this.otherPropertyImages.length; i++) {
            let otherImage = this.otherPropertyImages[i]
            formDataPropFiles.append('otherImages', otherImage)
          }
          const propImagesResponse = await singlePropService.multiImageUpload(formDataPropFiles)
          if (propImagesResponse) {
            if (propImagesResponse.data.success === true) {
              const response = await singlePropService.addPropertyImages({
                images: propImagesResponse.data.fileUrls,
                propID: this.prop_id
              })

              if (response) {
                if (response.data.success === true) {
                  this.propImages = response.data.otherImages
                } else if (response.data.success === false) {
                  console.log(response.data.error)
                }
              }
            } else if (propImagesResponse.data.success === false) {
              console.log(propImagesResponse.data.error)
            }
          }
        } catch (error) {
          console.log('Error adding other property images: ' + error)
        }
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
