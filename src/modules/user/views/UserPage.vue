<template>
  <v-container fluid>
    <TableCard
      :title="t('user.page.title')"
      :subtitle="subtitlePage"
      icon="mdi-account-cog-outline"
    >
      <v-row density="compact">
        <v-col cols="12" :md="isSysAdmin ? 4 : 8" :lg="isSysAdmin ? 4 : 8" :xl="isSysAdmin ? 6 : 9">
          <iterator-header>
            <v-btn-custom prepend-icon="mdi-plus" :block="mobile" @click="openUserDialog()">
              {{ t('user.actions.add') }}
            </v-btn-custom>
          </iterator-header>
        </v-col>

        <v-col v-if="isSysAdmin" cols="12" md="4" lg="4" xl="3">
          <IteratorHeader>
            <v-select
              v-model="selectedLocation"
              :placeholder="t('user.locationPlaceholder')"
              single-line
              hide-details
              prepend-inner-icon="mdi-map-marker-outline"
              :items="locations"
              item-value="id"
              item-title="name"
              @update:model-value="handleLocationChange"
            />
          </IteratorHeader>
        </v-col>

        <v-col cols="12" md="4" lg="4" xl="3">
          <IteratorHeader>
            <v-text-field
              v-model="state.search"
              :placeholder="t('user.search')"
              single-line
              hide-details
              clearable
              prepend-inner-icon="mdi-magnify"
            />
          </IteratorHeader>
        </v-col>

        <v-col cols="12">
          <v-data-table
            :items="userItems"
            :headers="tableHeaders"
            :search="state.search"
            :loading="state.loadingTable"
          >
            <template #loading>
              <v-skeleton-loader type="table-row@10" />
            </template>

            <template #item.roles="{ value }">
              <v-chip v-for="role in value" :key="role" class="ma-1">{{ role }}</v-chip>
            </template>

            <template #item.active="{ value }">
              <v-chip :color="value ? 'success' : 'error'">
                {{ value ? t('user.status.active') : t('user.status.inactive') }}
              </v-chip>
            </template>

            <template #item.locationName="{ value }">
              <v-avatar
                icon="mdi-map-marker-outline"
                variant="tonal"
                :color="value ? 'tertiary' : 'surface-light'"
                size="small"
              />
              <span class="text-caption ml-2">{{ value || '-' }}</span>
            </template>

            <template #item.actions="{ item }">
              <TooltipButton
                icon="mdi-delete-outline"
                :text="t('user.actions.delete')"
                color="error"
                @click="confirmDeleteUser(item)"
              />
              <TooltipButton
                icon="mdi-circle-edit-outline"
                :text="t('user.actions.edit')"
                color="secondary"
                @click="openUserDialog(item)"
              />
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </TableCard>

    <DialogCard
      v-model="state.dialogUser"
      :title="userDialogMeta.title"
      :icon="userDialogMeta.icon"
      :loading="state.loadingUserForm"
      :disabled="state.loadingUserForm"
      width="1000"
      actions
      @close="closeUserDialog"
    >
      <v-form v-model="state.userFormValid" @submit.prevent>
        <v-row>
          <v-col cols="12">
            <FormCard :title="t('user.form.generalData')" icon="mdi-account-outline">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="editedUser.firstName"
                    :label="t('user.form.firstName')"
                    :color="userDialogMeta.color"
                    :rules="userRules.firstName"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="editedUser.lastName"
                    :label="t('user.form.lastName')"
                    :color="userDialogMeta.color"
                    :rules="userRules.lastName"
                  />
                </v-col>
              </v-row>
            </FormCard>
          </v-col>

          <!-- Datos de Usuario -->
          <v-col cols="12">
            <FormCard :title="t('user.form.userData')" icon="mdi-account-circle-outline">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="editedUser.userName"
                    :label="t('user.form.userName')"
                    prepend-inner-icon="mdi-badge-account-outline"
                    :color="userDialogMeta.color"
                    :rules="userRules.userName"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-btn-custom
                    v-if="editedUserIndex != -1"
                    variant="text"
                    block
                    :color="userDialogMeta.color"
                    @click="state.dialogPassword = true"
                  >
                    {{ t('user.form.changePassword') }}
                  </v-btn-custom>
                  <v-text-field
                    v-else
                    v-model="editedUser.password"
                    :label="t('user.form.password')"
                    prepend-inner-icon="mdi-account-key-outline"
                    :color="userDialogMeta.color"
                    :rules="userRules.password"
                    :type="state.showPassword ? 'text' : 'password'"
                    :append-inner-icon="
                      state.showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                    "
                    @click:append-inner="state.showPassword = !state.showPassword"
                  />
                </v-col>

                <v-col cols="12" md="5" lg="5" xl="5">
                  <v-select
                    v-model="editedUser.roles"
                    :label="t('user.form.roles')"
                    prepend-inner-icon="mdi-account-cog-outline"
                    :color="userDialogMeta.color"
                    :rules="userRules.roles"
                    :items="roleOptions"
                    item-value="value"
                    item-title="title"
                    multiple
                    chips
                  />
                </v-col>

                <v-col cols="12" md="5" lg="5" xl="5">
                  <v-select
                    v-model="editedUser.locationId"
                    :label="t('user.form.location')"
                    :color="userDialogMeta.color"
                    :items="locations"
                    item-value="id"
                    item-title="name"
                    :rules="userRules.location"
                    :readonly="!isSysAdmin"
                  />
                </v-col>

                <v-col cols="12" md="2">
                  <v-checkbox
                    v-model="editedUser.active"
                    :label="t('user.form.active')"
                    :color="userDialogMeta.color"
                    hide-details
                  />
                </v-col>
              </v-row>
            </FormCard>
          </v-col>

          <v-col cols="12">
            <FormCard :title="t('user.form.contactInfo')" icon="mdi-card-account-details-outline">
              <v-row>
                <v-col cols="12" md="4" lg="5">
                  <v-text-field
                    v-model="editedUser.mobilePhone"
                    :label="t('user.form.mobilePhone')"
                    prepend-inner-icon="mdi-phone-outline"
                    :color="userDialogMeta.color"
                    :rules="userRules.mobilePhone"
                  />
                </v-col>
                <v-col cols="12" md="4" lg="5">
                  <v-text-field
                    v-model="editedUser.phoneOffice"
                    :label="t('user.form.phoneOffice')"
                    prepend-inner-icon="mdi-deskphone"
                    :color="userDialogMeta.color"
                    :rules="userRules.phoneOffice"
                  />
                </v-col>
                <v-col cols="12" md="4" lg="2">
                  <v-text-field
                    v-model="editedUser.phoneExt"
                    :label="t('user.form.phoneExt')"
                    prepend-inner-icon="mdi-card-account-phone-outline"
                    :color="userDialogMeta.color"
                    :rules="userRules.phoneExt"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedUser.email"
                    :label="t('user.form.email')"
                    prepend-inner-icon="mdi-email-outline"
                    :color="userDialogMeta.color"
                    :rules="userRules.email"
                  />
                </v-col>
              </v-row>
            </FormCard>
          </v-col>

          <v-col cols="12" class="text-label-medium text-disabled">
            {{ t('common.requiredFields') }}
          </v-col>
        </v-row>
      </v-form>

      <template #actions>
        <v-btn-custom variant="tonal" :color="userDialogMeta.color" @click="closeUserDialog">
          {{ t('common.cancel') }}
        </v-btn-custom>
        <v-btn-custom
          :color="userDialogMeta.color"
          :loading="state.loadingUserForm"
          :disabled="!state.userFormValid"
          @click="saveUser"
        >
          {{ t('common.save') }}
        </v-btn-custom>
      </template>

      <DialogCard
        v-model="state.dialogPassword"
        :title="t('user.dialog.titlePassword')"
        icon="mdi-lock-reset"
        :loading="state.loadingPassword"
        :disabled="state.loadingPassword"
        @close="closePasswordDialog"
      >
        <v-form v-model="state.passwordFormValid" @submit.prevent="savePassword">
          <FormCard>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedPassword.oldPassword"
                  :label="t('user.form.oldPassword')"
                  prepend-inner-icon="mdi-account-key-outline"
                  :type="state.showPasswordFields ? 'text' : 'password'"
                  :rules="passwordRules.oldPassword"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedPassword.newPassword"
                  :label="t('user.form.newPassword')"
                  prepend-inner-icon="mdi-account-key-outline"
                  :type="state.showPasswordFields ? 'text' : 'password'"
                  :rules="passwordRules.newPassword"
                />
              </v-col>
              <v-col cols="12">
                <v-switch
                  v-model="state.showPasswordFields"
                  :label="t('user.form.showFields')"
                  color="primary"
                  hide-details
                />
              </v-col>
              <v-col cols="12" class="text-label-medium text-disabled">
                {{ t('common.requiredFields') }}
              </v-col>
              <v-col cols="12" class="d-flex flex-wrap ga-2 justify-end">
                <v-btn-custom variant="tonal" @click="closePasswordDialog">
                  {{ t('common.cancel') }}
                </v-btn-custom>
                <v-btn-custom
                  type="submit"
                  :loading="state.loadingPassword"
                  :disabled="!state.passwordFormValid"
                >
                  {{ t('common.save') }}
                </v-btn-custom>
              </v-col>
            </v-row>
          </FormCard>
        </v-form>
      </DialogCard>
    </DialogCard>
  </v-container>
</template>

<script setup lang="ts">
  import { ref, computed, nextTick, onMounted, reactive } from 'vue';
  import { useDisplay } from 'vuetify';
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';
  import { createValidators } from '@/shared/utils/validators';
  import type {
    PasswordForm,
    LocationResponse,
    RoleOption,
    UserInitResponse,
    UserLightResponse,
    UserForm,
  } from '@/modules/user/types/userTypes';
  import TableCard from '@/shared/components/TableCard.vue';
  import IteratorHeader from '@/shared/components/IteratorHeader.vue';
  import DialogCard from '@/shared/components/DialogCard.vue';
  import FormCard from '@/shared/components/FormCard.vue';
  import { useAppStore } from '@/core/stores/appStore';
  import { locationsMockData, usersMockData } from '../MockData';
  import { useSwal } from '@/shared/composables/useSwal';
  import TooltipButton from '@/shared/components/TooltipButton.vue';
  const { t } = useTypedLocale();
  const { mobile } = useDisplay();
  const v = createValidators(t);
  const app = useAppStore(); // Quitar despues
  const currentUserLocationId = ref('9a1b2c3d-0004-4a2b-8c1d-aaaaaaaa0004');
  const currentUserLocation = ref('Puebla');
  const isSysAdmin = computed(() => app.role === 'SYSADMIN');
  const { toast, confirm } = useSwal();

  const emit = defineEmits<{
    loadingChange: [isLoading: boolean];
  }>();

  const userItems = ref<UserLightResponse[]>([]);
  const selectedLocation = ref<string | null>(null);
  const editedUserIndex = ref(-1);

  const defaultUser: UserForm = {
    id: '',
    locationId: null,
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    roles: ['CLIENT'],
    active: true,
    mobilePhone: '',
    phoneOffice: '',
    phoneExt: '',
    email: '',
  };
  const editedUser = ref<UserForm>({ ...defaultUser });

  const state = reactive({
    // Categories
    search: '',
    loadingTable: false,
    dialogUser: false,
    userFormValid: false,
    loadingUserForm: false,
    showPassword: false,
    // Password form
    dialogPassword: false,
    passwordFormValid: false,
    loadingPassword: false,
    showPasswordFields: false,
  });

  const defaultPassword: PasswordForm = { oldPassword: '', newPassword: '' };
  const editedPassword = ref<PasswordForm>({ ...defaultPassword });

  // ─── Datos estáticos ─────────────────────────────────────────────────

  const locations = ref<LocationResponse[]>([]);

  const roleOptions: RoleOption[] = [
    { value: 'ADMIN', title: 'Admin' },
    { value: 'CLIENT', title: 'Client' },
  ];

  const subtitlePage = computed(() =>
    isSysAdmin.value
      ? t('user.page.subtitleAll')
      : t('user.page.subtitleLocation', { location: currentUserLocation.value })
  );

  const userDialogMeta = computed(() => {
    const isNew = editedUserIndex.value === -1;
    return {
      title: isNew ? t('user.dialog.titleNew') : t('user.dialog.titleEdit'),
      icon: isNew ? 'mdi-plus' : 'mdi-circle-edit-outline',
      color: isNew ? 'primary' : 'secondary',
    };
  });

  const tableHeaders = computed(() => {
    const base = [
      { key: 'fullName', title: t('user.headers.fullName') },
      { key: 'userName', title: t('user.headers.userName') },
      { key: 'roles', title: t('user.headers.roles') },
      { key: 'active', title: t('user.headers.active') },
    ];
    const locationCol = { key: 'locationName', title: t('user.headers.location') };
    const actionsCol = {
      key: 'actions',
      title: t('user.headers.actions'),
      sortable: false,
      align: 'end' as const,
    };

    return isSysAdmin.value ? [...base, locationCol, actionsCol] : [...base, actionsCol];
  });

  // ─── Reglas de validación ─────────────────────────────────────────────

  const userRules = computed(() => ({
    firstName: [v.required(), v.maxLength(30, t('user.form.firstName'))],
    lastName: [v.required(), v.maxLength(30, t('user.form.lastName'))],
    userName: [v.required(), v.maxLength(30, t('user.form.userName'))],
    password: [
      v.required(),
      v.maxLength(30, t('user.form.password')),
      v.onlyPassword(t('user.form.password')),
    ],
    roles: [v.required(), v.requiredLength()],
    location: [v.required()],
    mobilePhone: [
      v.maxLength(15, t('user.form.mobilePhone')),
      v.onlyNumbers(t('user.form.mobilePhone')),
    ],
    phoneOffice: [
      v.maxLength(15, t('user.form.phoneOffice')),
      v.onlyNumbers(t('user.form.phoneOffice')),
    ],
    phoneExt: [v.maxLength(15, t('user.form.phoneExt')), v.onlyNumbers(t('user.form.phoneExt'))],
    email: [v.required(), v.maxLength(60, t('user.form.email')), v.onlyEmail(t('user.form.email'))],
  }));

  const passwordRules = computed(() => ({
    oldPassword: [
      v.required(),
      v.maxLength(30, t('user.form.oldPassword')),
      v.onlyPassword(t('user.form.oldPassword')),
    ],
    newPassword: [
      v.required(),
      v.maxLength(30, t('user.form.newPassword')),
      v.onlyPassword(t('user.form.newPassword')),
    ],
  }));

  function openUserDialog(item?: UserLightResponse): void {
    if (item) {
      emit('loadingChange', true);
      setTimeout(() => {
        editedUserIndex.value = userItems.value.indexOf(item);
        editedUser.value = { ...usersMockData.find(c => c.id === item.id)!, password: '' };
        console.log(editedUser.value);
        emit('loadingChange', false);
        state.dialogUser = true;
      }, 800);
    } else {
      // En modo creación, preseleccionar la locación del usuario actual si no es SYSADMIN
      if (!isSysAdmin.value) {
        editedUser.value = { ...defaultUser, locationId: currentUserLocationId.value };
      }
      state.dialogUser = true;
    }
  }

  function closeUserDialog(): void {
    state.dialogUser = false;
    nextTick(() => {
      editedUser.value = { ...defaultUser };
      editedUserIndex.value = -1;
      state.showPassword = false;
    });
  }

  async function saveUser(): Promise<void> {
    state.loadingUserForm = true;
    setTimeout(() => {
      if (editedUserIndex.value === -1) {
        userItems.value.push({
          ...editedUser.value,
          id: crypto.randomUUID(),
          locationName: locations.value.find(l => l.id === editedUser.value.locationId)?.name,
          fullName: `${editedUser.value.firstName} ${editedUser.value.lastName}`,
        });
      } else {
        const data = {
          ...editedUser.value,
          fullName: `${editedUser.value.firstName} ${editedUser.value.lastName}`,
          locationName: locations.value.find(l => l.id === editedUser.value.locationId)?.name,
        };
        Object.assign(userItems.value[editedUserIndex.value], data);
      }
      state.loadingUserForm = false;
      closeUserDialog();
    }, 1000);
  }

  function confirmDeleteUser(item: UserLightResponse): void {
    confirm(
      t('user.dialog.deleteTitle', { name: item.fullName }),
      'warning',
      t('user.dialog.deleteMessage')
    )
      .then(result => {
        if (result.isConfirmed) {
          userItems.value = userItems.value.filter(u => u.id !== item.id);
          toast('success', t('user.dialog.successMessage'));
        }
      })
      .catch(() => toast('error', t('user.dialog.errorMessage')));
  }

  function closePasswordDialog(): void {
    state.dialogPassword = false;
    state.showPasswordFields = false;
    nextTick(() => {
      editedPassword.value = { ...defaultPassword };
    });
  }

  async function savePassword(): Promise<void> {
    state.loadingPassword = true;
    setTimeout(() => {
      closePasswordDialog();
      state.loadingPassword = false;
    }, 1000);
  }

  async function handleLocationChange(locationId: string): Promise<void> {
    state.loadingTable = true;
    userItems.value = [];
    setTimeout(() => {
      userItems.value = usersMockData.filter(u => u.locationId === locationId);
      state.loadingTable = false;
    }, 1000);
  }

  function initialize(): void {
    state.loadingTable = true;
    setTimeout(() => {
      // Simula la petición
      const userInit: UserInitResponse = {
        userItems: usersMockData.map(u => ({
          id: u.id,
          fullName: u.fullName,
          userName: u.userName,
          active: u.active,
          locationId: u.locationId,
          roles: u.roles,
          locationName: u.locationName,
        })),
        locationItems: locationsMockData,
      };
      userItems.value = userInit.userItems;
      locations.value = userInit.locationItems;
      state.loadingTable = false;
    }, 1500);
  }
  onMounted(() => {
    if (!isSysAdmin.value) {
      handleLocationChange(currentUserLocationId.value);
    } else {
      initialize();
    }
  });
</script>
