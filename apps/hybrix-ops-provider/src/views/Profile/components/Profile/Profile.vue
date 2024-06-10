<template>
  <h-card>
    <div class="profile-content-wrapper">
      <p class="profile-content-title">Profile</p>
      <ProfileImageLayout :option-list="profileHead" :model-values="modelValues" />
      <ProfilePasswordLayout :option-list="profilePassword" />
      <UpdateBtnLayout :option="updateBtnOption" />
    </div>
  </h-card>
</template>

<script setup lang="ts">
import ProfileImageLayout from './components/ProfileImageLayout.vue';
import ProfilePasswordLayout from './components/ProfilePasswordLayout.vue';
import UpdateBtnLayout from '../UpdateBtnLayout.vue';
import { useUserStore } from '@/store/user';
import { onMounted, ref } from 'vue';
// import { getTeam, getTeams } from '@/api/modules/console/team';

const teamList = ref([
  { label: 'test-team001', value: 'test-team001' },
  { label: 'test1', value: 'test1' },
]);

const modelValues = ref([
  useUserStore().userInfo?.userId,
  useUserStore().userInfo?.displayname,
  useUserStore().userInfo?.email,
  useUserStore().userInfo?.phone,
  '',
]);

const profileHead = ref([
  { type: 'text', label: 'Account' },
  { type: 'text', label: 'Display Name' },
  { type: 'text', label: 'Email' },
  { type: 'text', label: 'Phone' },
  {
    type: 'select',
    label: 'Team',
    options: teamList.value,
  },
  {
    invisible: true,
  },
]);
const profilePassword = [
  { type: 'password', label: 'Password', button: true, buttonLabel: 'Check' },
  { invisible: true },
  { type: 'password', label: 'New Password' },
  { type: 'password', label: 'Password Confirm' },
];
const updateBtnOption = {
  disabled: false,
};
// const getTeamName = async (teamUrn: string) => {
//   const res = await getTeam(teamUrn);
//   const teamInfo = res.data.value.data[0];
//   modelValues.value[4] = teamInfo?.teamName;
// };

// const getAllTeams = async () => {
//   const { error, data } = await getTeams({});
//   teamList.value = data.value.data.map((item: any) => {
//     return {
//       label: item.teamName,
//       value: item.teamName,
//     };
//   });
// };

onMounted(async () => {
  // console.log('userInfo', useUserStore().userInfo);
  // await getAllTeams();
  // await getTeamName(useUserStore().userInfo?.team?.teamUrn);
});
</script>

<style scoped lang="scss">
.profile-content {
  &-wrapper {
    margin-top: var(--gap-1);
  }
  &-title {
    font-size: 1.8rem;
    margin: var(--gap-sm-1) 0 var(--gap-sm-2) var(--gap-2);
  }
}
</style>
