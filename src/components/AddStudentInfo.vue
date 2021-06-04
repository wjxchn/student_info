<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="1200"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Click Me
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Privacy Policy
        </v-card-title>

        <v-card-text>
          <v-form>
            <div style="width:230px;display:inline-block;position:ausolute;top:0px;">
                <img :src="addStudentInfoSrc" width="60%" height="60%" alt="" />
            </div>
            <div style="width:230px;display:inline-block;position:ausolute;top:0px;">
              <v-text-field
                class="ma-0 pa-0"
                v-model="name"
                single-line
                required
                outlined
                dense
                style="font-size:10px;"
              ></v-text-field>
            </div>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'AddStudentInfo',
  data(){
    return{
      dialog:false,
      addStudentInfoSrc: require('../assets/basicinfo/u264.svg'),
      name: '',
    }
  }
}
</script>

<style>

</style>