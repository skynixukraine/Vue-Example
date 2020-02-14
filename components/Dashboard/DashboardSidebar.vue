<template>
    <aside class="dashboard-sidebar">
        <div class="dashboard-sidebar__main">
            <div class="dashboard-sidebar__items">
                <ul class="dashboard-sidebar__list">
                    <li class="dashboard-sidebar__item dashboard-sidebar__item-account">
                         <NuxtLink class="dashboard-sidebar__link dashboard-sidebar__link_active" :to="$routes.personalInformation.path">Personal Information</NuxtLink>
                    </li>
                    <li class="dashboard-sidebar__item dashboard-sidebar__item-billing">
                         <NuxtLink class="dashboard-sidebar__link" :to="$routes.billing.path">Billing</NuxtLink>
                         <span class="dashboard-sidebar__sticker">New</span>
                    </li>
                    <li class="dashboard-sidebar__item dashboard-sidebar__item-enquiries">
                         <NuxtLink class="dashboard-sidebar__link" :to="$routes.enquiries.path">Anfragen</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
        <footer class="dashboard-sidebar__footer">
          <ul class="dashboard-sidebar__list">
            <li class="dashboard-sidebar__item dashboard-sidebar__item-logout">
              <LogoutButton />
            </li>
            <li class="dashboard-sidebar__item dashboard-sidebar__item">
                <NuxtLink class="dashboard-sidebar__link" :to="$routes.contact.path">Hilfe</NuxtLink>
            </li>
          </ul>
        </footer>
    </aside>
</template>

<script>
import LogoutButton from "~/components/Authorization/LogoutButton"

export default {
    components: {
        LogoutButton,
    }
}
</script>

<style lang="scss" scoped>
.dashboard-sidebar {
  display: none;
  flex-direction: column;
  padding: 40px 30px;
  width: 283px;
  background: $color-gradient-blue-light-revert;
  color: $color-white;
  @include tablet-big{ 
    display: flex;
    height: calc(100vh - 80px);
  }

  &__list {
    position: relative;
    list-style: none;
    padding: 0;
    margin-bottom: 30px;
  }

  &__item {
    position: relative;
    padding-left: 32px;
    margin-bottom: $main_offset;
    line-height: 23px;
    &:before {
      content: " ";
      position: absolute;
      left: 0;
      display: block;
      width: 24px;
      height: 24px;
      background-repeat: no-repeat;
      background-position: center;
    }

    &-account {
      &:before {
        background-image: url("~static/images/icons/account-icon.svg");
      }
    }

    &-enquiries {
      &:before {
        background-image: url("~static/images/icons/heart-icon.svg");
      }
    }

    &-billing {
      &:before {
        background-image: url("~static/images/icons/question-icon.svg");
      }
    }

    &-logout {
      &:before {
        background-image: url("~static/images/icons/logout-icon.svg");
      }
    }
  }

  &__link {
    color: $color-white;
    &_active {
      color: $color-light-blue;
    }
  }

  &__count {
    color: $color-count;
  }

  &__sticker {
    padding: 5px 8px;
    font-size: 15px;
    line-height: 1.27;
    background: rgba(255, 255, 255, 0.16);
    border-radius: 4px;
  }

  &__footer {
    margin-top: auto;
  }
}
</style>
