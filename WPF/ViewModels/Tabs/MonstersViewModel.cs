﻿using System;
using System.ComponentModel.Composition;
using AnotherCM.Library.Monster;
using AnotherCM.WPF.Framework;
using Caliburn.Micro;

namespace AnotherCM.WPF.ViewModels.Tabs {
    [Export(typeof(IShellViewTab))]
    public class MonstersViewModel : TabsBaseViewModel, IShellViewTab {
        private IEventAggregator eventAggregator;
        private IObservableCollection<Monster> items;
        private ILibrary library;
        private Monster selectedItem;

        [ImportingConstructor]
        public MonstersViewModel (ILibrary library, IEventAggregator eventAggregator) {
            this.DisplayName = "monsters";
            this.eventAggregator = eventAggregator;
            this.library = library;
            this.items = this.library.Monsters;
        }

        public IObservableCollection<Monster> Items {
            get {
                return this.items;
            }
            set {
                this.items = value;
                this.NotifyOfPropertyChange(() => this.Items);
            }
        }

        public Monster SelectedItem {
            get { return this.selectedItem; }
            set {
                if (value == null) {
                    return;
                }

                


                this.selectedItem = value;
                this.eventAggregator.PublishOnBackgroundThread(value);
                NotifyOfPropertyChange(() => SelectedItem);
            }
        }

        protected override void OnDeactivate (bool close) {
            this.library.Flush();
            base.OnDeactivate(close);
        }
    }
}