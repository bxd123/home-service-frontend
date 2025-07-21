<template>
  <div class="address">
    <van-nav-bar
      title="地址管理"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    
    <van-address-list
      v-model="selectedAddressId"
      :list="addressList"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
    
    <van-popup
      v-model:show="showAddressForm"
      position="bottom"
      :style="{ height: '90%' }"
    >
      <van-address-edit
        :address-info="currentAddress"
        :area-list="areaList"
        show-delete
        show-set-default
        @save="onSave"
        @delete="onDelete"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import { getAddressList, createAddress, updateAddress, deleteAddress } from '@/api/address'

const router = useRouter()
const showAddressForm = ref(false)
const selectedAddressId = ref('')
const addressList = ref([])
const currentAddress = ref({})

onMounted(async () => {
  await loadAddresses()
})

const loadAddresses = async () => {
  try {
    const res = await getAddressList()
    addressList.value = res.data.map(item => ({
      id: item.id,
      name: item.name,
      tel: item.phone,
      address: `${item.province}${item.city}${item.district}${item.address}`,
      isDefault: item.isDefault
    }))
  } catch (error) {
    showToast('获取地址列表失败')
  }
}

const onAdd = () => {
  currentAddress.value = {}
  showAddressForm.value = true
}

const onEdit = (item) => {
  currentAddress.value = item
  showAddressForm.value = true
}

const onSave = async (content) => {
  try {
    if (content.id) {
      await updateAddress(content.id, content)
    } else {
      await createAddress(content)
    }
    showToast('保存成功')
    showAddressForm.value = false
    await loadAddresses()
  } catch (error) {
    showToast('保存失败')
  }
}

const onDelete = async (content) => {
  try {
    await deleteAddress(content.id)
    showToast('删除成功')
    showAddressForm.value = false
    await loadAddresses()
  } catch (error) {
    showToast('删除失败')
  }
}

const onClickLeft = () => {
  router.back()
}
</script>